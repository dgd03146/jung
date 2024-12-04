import type { Collection } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabase';

export const collectionsService = {
	// 모든 컬렉션 조회
	async findMany({ sort = 'latest' }: { sort: 'latest' | 'popular' }) {
		try {
			let query = supabase
				.from('collections')
				.select('*')
				.returns<Collection[]>();

			if (sort === 'latest') {
				query = query.order('created_at', { ascending: false });
			} else if (sort === 'popular') {
				query = query.order('photo_count', { ascending: false });
			}

			const { data, error } = await query;

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch collections',
					cause: error,
				});
			}

			return data || [];
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred',
				cause: error,
			});
		}
	},

	// 특정 컬렉션 조회
	async findById(id: string): Promise<Collection> {
		try {
			const { data, error } = await supabase
				.from('collections')
				.select('*')
				.eq('id', id)
				.single<Collection>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch collection',
					cause: error,
				});
			}

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Collection not found',
				});
			}

			return data;
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred',
				cause: error,
			});
		}
	},
};
