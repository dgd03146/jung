import type { AdjacentPosts, Post, PostPreview } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabase';

type QueryParams = {
	limit: number;
	cursor?: number;
	cat?: string;
	sort: 'latest' | 'oldest' | 'popular';
	q?: string;
	locale?: 'ko' | 'en';
};

type PostWithCategory = Post & {
	categories: {
		name: string;
	};
	category_id: string;
	title_ko?: string;
	title_en?: string;
	description_ko?: string;
	description_en?: string;
	content_ko?: unknown;
	content_en?: unknown;
};

type QueryResult = {
	items: Post[];
	nextCursor: number | null;
	// total?: number;	`
};

export const blogService = {
	async findMany({
		limit,
		cursor,
		cat,
		sort,
		q,
		locale = 'ko',
	}: QueryParams): Promise<QueryResult> {
		try {
			// Select locale-specific columns with fallback to Korean
			const titleCol = locale === 'en' ? 'title_en' : 'title_ko';
			const descCol = locale === 'en' ? 'description_en' : 'description_ko';
			const contentCol = locale === 'en' ? 'content_en' : 'content_ko';

			let query = supabase
				.from('posts')
				.select(`
					id,
					${titleCol},
					${descCol},
					${contentCol},
					date,
					views,
					likes,
					liked_by,
					category_id,
					tags,
					imagesrc,
					categories!inner(name).name as category
				`)
				.eq('categories.type', 'blog');

			if (cat && cat !== 'all') {
				const { data: selectedCategory, error: categoryError } = await supabase
					.from('categories')
					.select('id')
					.ilike('name', cat)
					.eq('type', 'blog')
					.single();

				if (categoryError) {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: 'Failed to fetch categories. Please try again later.',
						cause: categoryError,
					});
				}

				if (selectedCategory) {
					const { data: childCategories, error: childError } = await supabase
						.from('categories')
						.select('id')
						.eq('type', 'blog')
						.eq('parent_id', selectedCategory.id);

					if (childError) {
						throw new TRPCError({
							code: 'INTERNAL_SERVER_ERROR',
							message:
								'Failed to fetch child categories. Please try again later.',
							cause: childError,
						});
					}

					const allCategoryIds = [
						selectedCategory.id,
						...(childCategories?.map((category) => category.id) || []),
					];

					query = query.in('category_id', allCategoryIds);
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

			if (sort === 'popular') {
				query = query.order('views', { ascending: false });
			} else {
				const isAscending = sort === 'oldest';
				query = query.order('date', { ascending: isAscending });
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
					const {
						categories,
						category_id,
						title_ko,
						title_en,
						description_ko,
						description_en,
						content_ko,
						content_en,
						...rest
					} = post;

					// Map locale-specific fields to standard field names with fallback
					const title =
						(locale === 'en' ? title_en : title_ko) || title_ko || '';
					const description =
						(locale === 'en' ? description_en : description_ko) ||
						description_ko ||
						'';
					const content =
						(locale === 'en' ? content_en : content_ko) || content_ko;

					return {
						...rest,
						title,
						description,
						content,
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

	async findById({
		postId,
		locale = 'ko',
	}: {
		postId: string;
		locale?: 'ko' | 'en';
	}): Promise<Post | null> {
		const { data, error } = await supabase
			.from('posts')
			.select(`
				*,
				categories!inner(name)->name as category
			`)
			.eq('id', postId)
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
			const {
				categories,
				category_id,
				title_ko,
				title_en,
				description_ko,
				description_en,
				content_ko,
				content_en,
				...rest
			} = data;

			// Select locale-specific fields with fallback to Korean
			const title = (locale === 'en' ? title_en : title_ko) || title_ko || '';
			const description =
				(locale === 'en' ? description_en : description_ko) ||
				description_ko ||
				'';
			const content = (locale === 'en' ? content_en : content_ko) || content_ko;

			return {
				...rest,
				title,
				description,
				category: categories.name,
				content: typeof content === 'string' ? JSON.parse(content) : content,
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
	async getAdjacentPosts({
		postId,
	}: {
		postId: string;
	}): Promise<AdjacentPosts> {
		const currentPost = await this.findById({ postId });

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

	// 좋아요 정보만 가져오기
	async getLikeInfo(
		postId: string,
	): Promise<{ likes: number; liked_by: string[] }> {
		try {
			const { data, error } = await supabase
				.from('posts')
				.select('likes, liked_by')
				.eq('id', postId)
				.single<{ likes: number; liked_by: string[] }>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to fetch like info: ${error.message}`,
					cause: error,
				});
			}

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Post not found',
				});
			}

			return {
				likes: data.likes,
				liked_by: data.liked_by || [],
			};
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred while fetching like info',
				cause: error,
			});
		}
	},
};
