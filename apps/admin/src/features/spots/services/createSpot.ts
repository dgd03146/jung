import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Spot } from '@jung/shared/types';
import { uploadSpotImage } from '../lib/uploadImage';

export interface CreateSpotInput {
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

export const createSpot = async (input: CreateSpotInput): Promise<Spot> => {
	console.log(input, 'input');

	try {
		const uploadedPhotos = await Promise.all(
			input.files.map(async (file) => {
				const { url } = await uploadSpotImage(file);

				return { url };
			}),
		);

		const { data: spot, error: spotError } = await supabase
			.from('spots')
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

		console.log(spot, 'spot');

		if (spotError) {
			await Promise.all(
				uploadedPhotos.map(async (photo) => {
					const filePath = new URL(photo.url).pathname.split('/').pop();
					if (filePath) {
						await supabase.storage
							.from('spots_images')
							.remove([`uploads/${filePath}`]);
					}
				}),
			);
			throw ApiError.fromPostgrestError(spotError);
		}

		if (!spot) {
			throw new ApiError('Failed to create spot', 'NO_DATA');
		}

		return spot;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while creating the spot',
			'UNKNOWN_ERROR',
		);
	}
};
