import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Place, PlaceImageUpload } from '@jung/shared/types';
import { uploadPlaceImage } from '../lib/uploadImage';

export interface UpdatePlaceInput {
	id: string;
	title: string;
	description: string;
	address: string;
	images: PlaceImageUpload[];
	category_id: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	tags?: string[];
	tips?: string[];
}

export const updatePlace = async (input: UpdatePlaceInput): Promise<Place> => {
	try {
		const newImages = input.images.filter(
			(img) => img.status === 'new' && img.file,
		);
		const uploadedPhotos = await Promise.all(
			newImages.map(async (image) => {
				const { url } = await uploadPlaceImage(image.file!);
				return { url };
			}),
		);

		const remainingPhotos = input.images
			.filter((img) => img.status === 'existing')
			.map((img) => ({ url: img.url }));

		const allPhotos = [...remainingPhotos, ...uploadedPhotos];

		const { data: place, error: placeError } = await supabase
			.from('places')
			.update({
				title: input.title,
				description: input.description,
				address: input.address,
				photos: allPhotos,
				category_id: input.category_id,
				coordinates: input.coordinates,
				tags: input.tags || [],
				tips: input.tips || [],
				updated_at: new Date().toISOString(),
			})
			.eq('id', input.id)
			.select()
			.single();

		if (placeError) {
			await Promise.all(
				uploadedPhotos.map(async ({ url }) => {
					const filePath = new URL(url).pathname.split('/').pop();
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
			throw new ApiError('Failed to update place', 'NO_DATA');
		}

		return place;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while updating the place',
			'UNKNOWN_ERROR',
		);
	}
};
