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
	async findById(id: string) {
		try {
			const { data: collection, error: collectionError } = await supabase
				.from('collections')
				.select('*')
				.eq('id', id)
				.single();

			if (collectionError) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Collection not found',
				});
			}

			const { data: photos, error: photosError } = await supabase
				.from('photos')
				.select(`
					*,
					collection_photos!inner(collection_id)
				`)
				.eq('collection_photos.collection_id', id)
				.order('created_at', { ascending: false });

			if (photosError) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch photos',
				});
			}

			return {
				collection: {
					id: collection.id,
					title: collection.title,
					description: collection.description,
					cover_image: collection.cover_image,
					photo_count: collection.photo_count,
				},
				photos: photos || [],
			};
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
