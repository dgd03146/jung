import type { Photo } from '@jung/shared/types';
import { mapDbPhotoToPhoto } from '@/fsd/features/gallery/lib';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

interface GetPhotosByCollectionIdParams {
	collectionId: string;
	page?: number;
	limit?: number;
}

interface PhotosResponse {
	items: Photo[];
	total: number;
	collectionTitle: string;
}

export const getPhotosByCollectionId = async ({
	collectionId,
	page = 1,
	limit = 20,
}: GetPhotosByCollectionIdParams): Promise<PhotosResponse> => {
	// 먼저 collection 정보를 가져옴
	const { data: collection, error: collectionError } = await supabase
		.from('collections')
		.select('title')
		.eq('id', collectionId)
		.single();

	if (collectionError) {
		throw ApiError.fromPostgrestError(collectionError);
	}

	if (!collection) {
		throw new ApiError('Collection not found', 'NOT_FOUND');
	}

	const from = (page - 1) * limit;
	const to = from + limit - 1;

	const {
		data: photos,
		error,
		count,
	} = await supabase
		.from('photos')
		.select(
			`
      *,
      collection_photos!inner(collection_id)
    `,
			{ count: 'exact' },
		)
		.eq('collection_photos.collection_id', collectionId)
		.range(from, to);

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!photos) {
		throw new ApiError('Photos not found', 'NOT_FOUND');
	}

	return {
		items: photos.map(mapDbPhotoToPhoto),
		total: count ?? 0,
		collectionTitle: collection.title,
	};
};
