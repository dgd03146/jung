import type { Post } from '@jung/shared/types';
import type { AdjacentPosts, PostPreview } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabase';

type QueryParams = {
	limit: number;
	cursor?: number;
	cat?: string;
	sort: 'latest' | 'oldest' | 'popular';
	q?: string;
};

type PostWithCategory = Post & {
	categories: {
		name: string;
	};
	category_id: string;
};

type QueryResult = {
	items: Post[];
	nextCursor: number | null;
	// total?: number;	`
};

export const postService = {
	async findMany({
		limit,
		cursor,
		cat,
		sort,
		q,
	}: QueryParams): Promise<QueryResult> {
		try {
			let query = supabase
				.from('posts')
				.select(`
					*,
					categories!inner(name).name as category
				`)
				.eq('categories.type', 'blog');

			if (cat && cat !== 'all') {
				const { data: categoryIds, error: categoryError } = await supabase
					.from('categories')
					.select('id')
					.eq('name', cat)
					.eq('type', 'blog');

				if (categoryError) {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: 'Failed to fetch categories. Please try again later.',
						cause: categoryError,
					});
				}

				if (categoryIds && categoryIds.length > 0) {
					query = query.in(
						'category_id',
						categoryIds.map((category) => category.id),
					);
				} else {
					return {
						items: [],
						nextCursor: null,
					};
				}
			}

			if (q) {
				const searchTerm = `%${q}%`;

				query = query.or(
					`title.ilike.${searchTerm},` +
						`description.ilike.${searchTerm},` +
						`tags.cs.{${q}}`,
				);
			}

			if (cursor) {
				const { data: cursorPost } = await supabase
					.from('posts')
					.select('date')
					.eq('id', cursor)
					.single();

				if (cursorPost) {
					const operator = sort === 'oldest' ? 'gt' : 'lt';
					query = query[operator]('date', cursorPost.date);
				}
			}

			query = query.order('date', { ascending: sort === 'oldest' });

			if (sort === 'popular') {
				query = query.order('views', { ascending: false });
			}

			query = query.limit(limit);

			const { data, error } = await query.returns<PostWithCategory[]>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch posts. Please try again later.',
					cause: error,
				});
			}

			if (!data || data.length === 0) {
				return {
					items: [],
					nextCursor: null,
				};
			}

			const lastItem = data[data.length - 1];
			const nextCursor = data.length === limit ? Number(lastItem?.id) : null;

			return {
				items: data.map((post) => {
					const { categories, category_id, ...rest } = post;
					return {
						...rest,
						category: categories.name,
					};
				}),
				nextCursor,
			};
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to create post. Please try again later.',
				cause: error,
			});
		}
	},

	async findById(id: string): Promise<Post | null> {
		const { data, error } = await supabase
			.from('posts')
			.select(`
				*,
				categories!inner(name)->name as category
			`)
			.eq('id', id)
			.single<PostWithCategory>();

		if (error) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found. Please try searching again.',
				cause: error,
			});
		}
		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found. Please try searching again.',
			});
		}

		try {
			const { categories, category_id, ...rest } = data;
			return {
				...rest,
				category: categories.name,
				content:
					typeof data.content === 'string'
						? JSON.parse(data.content)
						: data.content,
			};
		} catch (e) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Invalid post content format',
				cause: e,
			});
		}
	},

	async create(post: Omit<Post, 'id'>): Promise<Post> {
		const { data, error } = await supabase
			.from('posts')
			.insert(post)
			.select()
			.single();

		if (error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Failed to create post. Please try again later.',
				cause: error,
			});
		}
		if (!data) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to create post. Please try again later.',
			});
		}
		return data as Post;
	},

	// 좋아요

	async toggleLike({
		postId,
		userId,
	}: {
		postId: string;
		userId: string;
	}): Promise<Post> {
		const { data: post, error: selectError } = await supabase
			.from('posts')
			.select('*')
			.eq('id', postId)
			.single<Post>();

		if (selectError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch post: ${selectError.message}`,
				cause: selectError,
			});
		}

		if (!post) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found',
			});
		}

		const hasLiked = post.liked_by.includes(userId);
		const newLikes = hasLiked ? post.likes - 1 : post.likes + 1;
		const newLikedBy = hasLiked
			? post.liked_by.filter((id) => id !== userId)
			: [...post.liked_by, userId];

		const { data, error } = await supabase
			.from('posts')
			.update({
				likes: newLikes,
				liked_by: newLikedBy,
			})
			.eq('id', postId)
			.select()
			.single<Post>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to toggle like: ${error.message}`,
				cause: error,
			});
		}

		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Comment not found or like could not be toggled',
			});
		}

		return data;
	},

	// 이전, 이후 포스트 가져오기
	async getAdjacentPosts(currentPostId: string): Promise<AdjacentPosts> {
		const currentPost = await this.findById(currentPostId);

		if (!currentPost) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Current post not found',
			});
		}

		// 현재 포스트의 date를 기준으로 이전/이후 포스트를 각각 하나씩 가져옴
		const [{ data: previousPost }, { data: nextPost }] = await Promise.all([
			supabase
				.from('posts')
				.select('id, title')
				.lt('date', currentPost.date)
				.order('date', { ascending: false })
				.limit(1)
				.single<PostPreview>(),
			supabase
				.from('posts')
				.select('id, title')
				.gt('date', currentPost.date)
				.order('date', { ascending: true })
				.limit(1)
				.single<PostPreview>(),
		]);

		return {
			previous: previousPost || null,
			next: nextPost || null,
		};
	},
};
