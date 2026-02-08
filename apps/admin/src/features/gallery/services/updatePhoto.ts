import type { Photo } from '@jung/shared/types';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { uploadGalleryImage } from '../lib/uploadImage';
import type { PhotoTranslation } from './createPhoto';

export interface UpdatePhotoInput {
	id: string;
	file?: File;
	title: string;
	description: string;
	alt: string;
	tags?: string[];
	collection_id: string;
	translations?: PhotoTranslation;
}

export const updatePhoto = async (input: UpdatePhotoInput): Promise<Photo> => {
	let imageData = {};

	if (input.file) {
		const {
			key: image_url,
			width,
			height,
		} = await uploadGalleryImage(input.file);
		imageData = { image_url, width, height }; // R2 key 저장
	}

	const { data: photo, error: photoError } = await supabase
		.from('photos')
		.update({
			title: input.title,
			description: input.description,
			alt: input.alt,
			tags: input.tags || [],
			title_en: input.translations?.title_en ?? null,
			description_en: input.translations?.description_en ?? null,
			tags_en: input.translations?.tags_en ?? null,
			...imageData,
			updated_at: new Date().toISOString(),
		})
		.eq('id', input.id)
		.select()
		.single();

	if (photoError) {
		throw ApiError.fromPostgrestError(photoError);
	}

	if (!photo) {
		throw new ApiError('Failed to update photo', 'NO_DATA');
	}

	const { data: existingCollection } = await supabase
		.from('collection_photos')
		.select('collection_id')
		.eq('photo_id', input.id)
		.single();

	if (existingCollection?.collection_id !== input.collection_id) {
		const { error: deleteError } = await supabase
			.from('collection_photos')
			.delete()
			.eq('photo_id', input.id);

		if (deleteError) {
			throw ApiError.fromPostgrestError(deleteError);
		}

		const { error: insertError } = await supabase
			.from('collection_photos')
			.insert([
				{
					collection_id: input.collection_id,
					photo_id: input.id,
					created_at: new Date().toISOString(),
				},
			]);

		if (insertError) {
			throw ApiError.fromPostgrestError(insertError);
		}
	}

	return photo;
};
