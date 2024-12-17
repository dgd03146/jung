import type {
	Spot,
	SpotQueryParams,
	SpotQueryResult,
} from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabase';

export const spotsService = {
	async findMany({
		limit,
		cursor,
		cat,
		q: search,
		sort = 'latest',
	}: SpotQueryParams): Promise<SpotQueryResult> {
		try {
			let query = supabase.from('spots').select('*', { count: 'exact' });

			if (cat && cat !== 'all') {
				query = query.eq('category', cat);
			}

			if (search) {
				query = query.or(
					`title.ilike.%${search}%,description.ilike.%${search}%`,
				);
			}

			if (sort === 'rating') {
				query = query.order('rating', { ascending: false });
			} else {
				query = query.order('id', { ascending: false });
			}

			if (cursor) {
				query = query.lt('id', cursor);
			}

			query = query.limit(limit);

			const { data, error } = await query.returns<Spot[]>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch spots. Please try again later.',
					cause: error,
				});
			}

			if (!data || data.length === 0) {
				return {
					items: [],
					nextCursor: null,
				};
			}

			const nextCursor = data[data.length - 1]?.id ?? null;

			return {
				items: data,
				nextCursor,
			};
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred',
				cause: error,
			});
		}
	},

	async findById(id: string): Promise<Spot> {
		const { data, error } = await supabase
			.from('spots')
			.select('*')
			.eq('id', id)
			.single<Spot>();

		if (error) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Spot not found. Please try searching again.',
				cause: error,
			});
		}

		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Spot not found. Please try searching again.',
			});
		}

		return data;
	},
};
