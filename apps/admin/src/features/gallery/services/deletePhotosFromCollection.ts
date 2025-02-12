import { STORAGE } from '@/fsd/features/gallery/config';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

interface DeletePhotosFromCollectionParams {
	photoIds: string[];
	collectionId: string;
	photoUrls: string[];
}

export const deletePhotosFromCollection = async ({
	photoIds,
	collectionId,
	photoUrls,
}: DeletePhotosFromCollectionParams): Promise<void> => {
	if (photoUrls.length > 0) {
		const photoPaths = photoUrls
			.map((url) => url.split(`${STORAGE.BUCKETS.GALLERY}/`).pop())
			.filter((path): path is string => path !== undefined);

		if (photoPaths.length !== photoUrls.length) {
			throw new ApiError('Invalid photo paths found', 'STORAGE_ERROR');
		}

		const { error: storageError } = await supabase.storage
			.from(STORAGE.BUCKETS.GALLERY)
			.remove(photoPaths);

		if (storageError) {
			throw new ApiError('Failed to delete photo files', 'STORAGE_ERROR');
		}
	}

	const { error: relationError } = await supabase
		.from('collection_photos')
		.delete()
		.eq('collection_id', collectionId)
		.in('photo_id', photoIds);

	if (relationError) {
		throw new ApiError(
			'Failed to delete collection photos relation',
			'DATABASE_ERROR',
		);
	}

	const { error: photosError } = await supabase
		.from('photos')
		.delete()
		.in('id', photoIds);

	if (photosError) {
		throw new ApiError('Failed to delete photos', 'DATABASE_ERROR');
	}
};
