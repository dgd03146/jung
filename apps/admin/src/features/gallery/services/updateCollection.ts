import { STORAGE } from '@/fsd/features/gallery/config';
import { uploadGalleryImage } from '@/fsd/features/gallery/lib';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Collection } from '@jung/shared/types';

interface UpdateCollectionData {
	id: string;
	title: string;
	description: string;
	coverImageFile?: File;
}

export const updateCollection = async (
	data: UpdateCollectionData,
): Promise<Collection> => {
	const { id, title, description, coverImageFile } = data;

	const updateData: Partial<Collection> = {
		title,
		description,
	};

	if (coverImageFile) {
		const { data: existingCollection, error: fetchError } = await supabase
			.from('collections')
			.select('cover_image')
			.eq('id', id)
			.single();

		if (fetchError) {
			throw ApiError.fromPostgrestError(fetchError);
		}

		if (existingCollection?.cover_image) {
			const imagePath = existingCollection.cover_image
				.split(`${STORAGE.BUCKETS.GALLERY}/`)
				.pop();
			const { error: storageError } = await supabase.storage
				.from(STORAGE.BUCKETS.GALLERY)
				.remove([imagePath]);

			if (storageError) {
				throw new ApiError('Failed to delete old image file', 'STORAGE_ERROR');
			}
		}

		const coverImageUrl = await uploadGalleryImage(coverImageFile);
		updateData.cover_image = coverImageUrl.url;
	}

	const { data: updatedCollection, error } = await supabase
		.from('collections')
		.update(updateData)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!updatedCollection) {
		throw new ApiError('Failed to update collection', 'UPDATE_FAILED');
	}

	return updatedCollection;
};
