import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Place } from '@jung/shared/types';
import { uploadPlaceImage } from '../lib/uploadImage';

export interface CreatePlaceInput {
	title: string;
	description: string;
	address: string;
	files: File[];
	category_id: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	tags?: string[];
	tips?: string[];
}

export const createPlace = async (input: CreatePlaceInput): Promise<Place> => {
	try {
		const uploadedPhotos = await Promise.all(
			input.files.map(async (file) => {
				const { url } = await uploadPlaceImage(file);

				return { url };
			}),
		);

		const { data: place, error: placeError } = await supabase
			.from('places')
			.insert([
				{
					title: input.title,
					description: input.description,
					address: input.address,
					photos: uploadedPhotos,
					category_id: input.category_id,
					coordinates: input.coordinates,
					tags: input.tags || [],
					tips: input.tips || [],
					likes: 0,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
					liked_by: [],
				},
			])
			.select()
			.single();

		if (placeError) {
			await Promise.all(
				uploadedPhotos.map(async (photo) => {
					const filePath = new URL(photo.url).pathname.split('/').pop();
					if (filePath) {
						await supabase.storage
							.from('places_images')
							.remove([`uploads/${filePath}`]);
					}
				}),
			);
			throw ApiError.fromPostgrestError(placeError);
		}

		if (!place) {
			throw new ApiError('Failed to create place', 'NO_DATA');
		}

		return place;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while creating the place',
			'UNKNOWN_ERROR',
		);
	}
};
