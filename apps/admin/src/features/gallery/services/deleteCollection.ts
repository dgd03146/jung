import { STORAGE } from '@/fsd/features/gallery/config';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Collection, CollectionPhoto, Photo } from '@jung/shared/types';

interface CollectionWithPhotos extends Pick<Collection, 'cover_image'> {
	collection_photos: {
		photo_id: CollectionPhoto['photo_id'];
		photos: Pick<Photo, 'id' | 'image_url'>;
	}[];
}

export const deleteCollection = async (id: string): Promise<void> => {
	const { data: collection, error: fetchError } = await supabase
		.from('collections')
		.select(`
			cover_image,
			collection_photos!inner (
				photo_id,
				photos!inner (
					id,
					image_url
				)
			)
		`)
		.eq('id', id)
		.single<CollectionWithPhotos>();

	if (fetchError) {
		throw ApiError.fromPostgrestError(fetchError);
	}

	if (!collection) {
		throw new ApiError('Collection not found', 'NOT_FOUND');
	}

	if (collection.cover_image) {
		const imagePath = collection.cover_image
			.split(`${STORAGE.BUCKETS.GALLERY}/`)
			.pop();

		if (!imagePath) {
			throw new ApiError('Invalid cover image path', 'STORAGE_ERROR');
		}

		const { error: coverStorageError } = await supabase.storage
			.from(STORAGE.BUCKETS.GALLERY)
			.remove([imagePath]);

		if (coverStorageError) {
			throw new ApiError('Failed to delete cover image', 'STORAGE_ERROR');
		}
	}

	const photoIds = collection.collection_photos.map((cp) => cp.photos.id);
	const photoUrls = collection.collection_photos.map(
		(cp) => cp.photos.image_url,
	);

	if (photoUrls.length > 0) {
		const photoPaths = photoUrls
			.map((url) => url.split(`${STORAGE.BUCKETS.GALLERY}/`).pop())
			.filter((path): path is string => path !== undefined);

		if (photoPaths.length !== photoUrls.length) {
			throw new ApiError('Invalid photo paths found', 'STORAGE_ERROR');
		}

		const { error: photoStorageError } = await supabase.storage
			.from(STORAGE.BUCKETS.GALLERY)
			.remove(photoPaths);

		if (photoStorageError) {
			throw new ApiError('Failed to delete photo files', 'STORAGE_ERROR');
		}
	}

	const { error: relationError } = await supabase
		.from('collection_photos')
		.delete()
		.eq('collection_id', id);

	if (relationError) {
		throw ApiError.fromPostgrestError(relationError);
	}

	if (photoIds.length > 0) {
		const { error: photosError } = await supabase
			.from('photos')
			.delete()
			.in('id', photoIds);

		if (photosError) {
			throw ApiError.fromPostgrestError(photosError);
		}
	}

	const { error: deleteError } = await supabase
		.from('collections')
		.delete()
		.eq('id', id);

	if (deleteError) {
		throw ApiError.fromPostgrestError(deleteError);
	}
};
