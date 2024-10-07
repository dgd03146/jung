import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabse';
import type { Post } from '../schemas/post';

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

		return {
			...data,
			content: JSON.parse(data.content),
		};
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
};
