import { STORAGE } from '@/fsd/features/gallery/config';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const deletePhoto = async (id: string): Promise<void> => {
	const { data: photo, error: fetchError } = await supabase
		.from('photos')
		.select('image_url')
		.eq('id', id)
		.single();

	if (fetchError) {
		throw ApiError.fromPostgrestError(fetchError);
	}

	if (!photo) {
		throw new ApiError('Photo not found', 'NOT_FOUND');
	}

	const imagePath = photo.image_url.split(`${STORAGE.BUCKETS.GALLERY}/`).pop();
	const { error: storageError } = await supabase.storage
		.from(STORAGE.BUCKETS.GALLERY)
		.remove([imagePath]);

	if (storageError) {
		throw new ApiError('Failed to delete image file', 'STORAGE_ERROR');
	}

	const { error: collectionPhotoError } = await supabase
		.from('collection_photos')
		.delete()
		.eq('photo_id', id);

	if (collectionPhotoError) {
		throw ApiError.fromPostgrestError(collectionPhotoError);
	}

	const { error: photoError } = await supabase
		.from('photos')
		.delete()
		.eq('id', id);

	if (photoError) {
		throw ApiError.fromPostgrestError(photoError);
	}
};
