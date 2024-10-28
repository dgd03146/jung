import type { Post } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabse';

type QueryParams = {
	limit: number;
	cursor?: number;
	cat?: string;
	sort: 'latest' | 'oldest' | 'popular';
	q?: string;
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
		let query = supabase.from('posts').select('*', { count: 'exact' });

		if (cat && cat !== 'all') {
			query = query.eq('category', cat);
		}

		if (q) {
			query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
		}

		switch (sort) {
			case 'oldest':
				query = query.order('date', { ascending: true });
				break;
			case 'popular':
				query = query.order('views', { ascending: false });
				break;
			default:
				query = query.order('date', { ascending: false });
		}

		if (cursor) {
			query = query.gt('id', cursor);
		}
		query = query.limit(limit);

		const { data, error } = await query.returns<Post[]>();

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
				// total: count || 0,
			};
		}

		const nextCursor = Number(data[data.length - 1]?.id) ?? null;

		// FIXME: 모든 데이터 다 내려줄 필요 없음
		return {
			items: data,
			nextCursor,
			// total: count || 0,
		};
	},

	async findById(id: string): Promise<Post | null> {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.eq('id', id)
			.single<Post>();

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
			return {
				...data,
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

	async toggleLike({
		postId,
		userId,
	}: {
		postId: string;
		userId: string;
	}): Promise<Post> {
		// 포스트 가져오기
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

		// 좋아요 상태 업데이트
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

	async getAdjacentPosts(currentPostId: string) {
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
				.single(),
			supabase
				.from('posts')
				.select('id, title')
				.gt('date', currentPost.date)
				.order('date', { ascending: true })
				.limit(1)
				.single(),
		]);

		return {
			previous: previousPost || null,
			next: nextPost || null,
		};
	},
};
