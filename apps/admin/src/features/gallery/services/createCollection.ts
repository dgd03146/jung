import type { Collection } from '@jung/shared/types';
import { uploadGalleryImage } from '@/fsd/features/gallery/lib';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

interface CreateCollectionData {
	title: string;
	description: string;
	coverImageFile: File;
}

export const createCollection = async (
	data: CreateCollectionData,
): Promise<Collection> => {
	const { title, description, coverImageFile } = data;

	const { key } = await uploadGalleryImage(coverImageFile);

	const { data: newCollection, error } = await supabase
		.from('collections')
		.insert([
			{
				title,
				description,
				cover_image: key, // R2 key 저장
				photo_count: 0,
			},
		])
		.select()
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!newCollection) {
		throw new ApiError('Failed to create collection', 'INSERT_FAILED');
	}

	return newCollection;
};
