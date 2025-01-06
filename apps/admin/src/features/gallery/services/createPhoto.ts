import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Photo } from '@jung/shared/types';
import { uploadGalleryImage } from '../lib/uploadImage';

interface CreatePhotoInput {
	file: File;
	title: string;
	description: string;
	alt: string;
	tags?: string[];
	collection_id: string;
}

export const createPhoto = async (input: CreatePhotoInput): Promise<Photo> => {
	try {
		const {
			url: image_url,
			width,
			height,
		} = await uploadGalleryImage(input.file);

		const { data: photo, error: photoError } = await supabase
			.from('photos')
			.insert([
				{
					title: input.title,
					description: input.description,
					alt: input.alt,
					tags: input.tags || [],
					image_url,
					width,
					height,
					views: 0,
					likes: 0,
					created_at: new Date().toISOString(),
					liked_by: [],
				},
			])
			.select()
			.single();

		if (photoError) {
			throw ApiError.fromPostgrestError(photoError);
		}

		if (!photo) {
			throw new ApiError('Failed to create photo', 'NO_DATA');
		}

		const { error: collectionPhotoError } = await supabase
			.from('collection_photos')
			.insert([
				{
					collection_id: input.collection_id,
					photo_id: photo.id,
					created_at: new Date().toISOString(),
				},
			]);

		if (collectionPhotoError) {
			await supabase.from('photos').delete().eq('id', photo.id);

			throw ApiError.fromPostgrestError(collectionPhotoError);
		}

		return photo;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while creating the photo',
			'UNKNOWN_ERROR',
		);
	}
};
