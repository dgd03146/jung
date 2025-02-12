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
			// 1. Collection 정보 조회
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

			// 2. Collection에 속한 photos 조회
			const { data: collectionPhotos, error: collectionPhotosError } =
				await supabase
					.from('collection_photos')
					.select('photo_id')
					.eq('collection_id', id);

			if (collectionPhotosError) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch collection photo IDs',
				});
			}

			const photoIds = collectionPhotos.map((item) => item.photo_id);
			const { data: photos, error: photosError } = await supabase
				.from('photos')
				.select('*')
				.in('id', photoIds);

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
