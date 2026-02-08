import type { Collection } from '@jung/shared/types';
import { uploadGalleryImage } from '@/fsd/features/gallery/lib';
import { supabase } from '@/fsd/shared';
import { deleteFromR2 } from '@/fsd/shared/lib';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

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
		// 기존 이미지 삭제
		const { data: existingCollection, error: fetchError } = await supabase
			.from('collections')
			.select('cover_image')
			.eq('id', id)
			.single();

		if (fetchError) {
			throw ApiError.fromPostgrestError(fetchError);
		}

		if (existingCollection?.cover_image) {
			await deleteFromR2(existingCollection.cover_image);
		}

		// 새 이미지 업로드
		const { key } = await uploadGalleryImage(coverImageFile);
		updateData.cover_image = key;
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

	return {
		...updatedCollection,
		description: updatedCollection.description ?? '',
		created_at: updatedCollection.created_at ?? new Date().toISOString(),
		photo_count: updatedCollection.photo_count ?? 0,
	};
};
