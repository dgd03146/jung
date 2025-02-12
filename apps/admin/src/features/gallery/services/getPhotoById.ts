import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Photo } from '@jung/shared/types';

interface PhotoWithCollection extends Photo {
	collection_id: string;
	collection_title: string;
}

export const getPhotoById = async (
	id: string,
): Promise<PhotoWithCollection> => {
	const { data: photo, error } = await supabase
		.from('photos')
		.select(`
			*,
			collection_id:collection_photos!inner(collection_id),
			collection_title:collection_photos!inner(
				collections!inner(title)
			)
		`)
		.eq('id', id)
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!photo) {
		throw new ApiError('Photo not found', 'NOT_FOUND');
	}

	return {
		...photo,
		collection_id: photo.collection_id[0].collection_id,
		collection_title: photo.collection_title[0].collections.title,
	};
};
