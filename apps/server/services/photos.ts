import type { Photo } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabse';

type QueryParams = {
	limit: number;
	cursor?: number;

	sort?: 'latest' | 'popular';
	q?: string;
};

type QueryResult = {
	items: Photo[];
	nextCursor: number | null;
};

export const photosService = {
	async findMany({
		limit,
		cursor,
		sort,
		q,
	}: QueryParams): Promise<QueryResult> {
		let query = supabase.from('photos').select('*', { count: 'exact' });

		if (q) {
			query = query.or(`description.ilike.%${q}%,tags.cs.{${q}}`);
		}

		switch (sort) {
			case 'popular':
				query = query.order('views', { ascending: false });
				break;
			default: // latest
				query = query.order('created_at', { ascending: false });
		}

		if (cursor) {
			query = query.gt('id', cursor);
		}
		query = query.limit(limit);

		const { data, error } = await query.returns<Photo[]>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch photos. Please try again later.',
				cause: error,
			});
		}

		if (!data || data.length === 0) {
			return {
				items: [],
				nextCursor: null,
			};
		}

		const nextCursor = Number(data[data.length - 1]?.id) ?? null;

		return {
			items: data,
			nextCursor,
		};
	},

	async findById(id: number): Promise<Photo | null> {
		const { data, error } = await supabase
			.from('photos')
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Photo not found. Please try searching again.',
				cause: error,
			});
		}

		if (!data) return null;

		return data;
	},
};
