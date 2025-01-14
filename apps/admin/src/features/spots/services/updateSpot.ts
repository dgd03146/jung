import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Spot, SpotImageUpload } from '@jung/shared/types';
import { uploadSpotImage } from '../lib/uploadImage';

// FIXME: 기존 SPOT 타입 재활용하기
export interface UpdateSpotInput {
	id: string;
	title: string;
	description: string;
	address: string;
	images: SpotImageUpload[];
	category_id: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	tags?: string[];
	tips?: string[];
}

export const updateSpot = async (input: UpdateSpotInput): Promise<Spot> => {
	try {
		const newImages = input.images.filter(
			(img) => img.status === 'new' && img.file,
		);
		const uploadedPhotos = await Promise.all(
			newImages.map(async (image) => {
				const { url } = await uploadSpotImage(image.file!);
				return { url };
			}),
		);

		const remainingPhotos = input.images
			.filter((img) => img.status === 'existing')
			.map((img) => ({ url: img.url }));

		const allPhotos = [...remainingPhotos, ...uploadedPhotos];

		const { data: spot, error: spotError } = await supabase
			.from('spots')
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

		if (spotError) {
			await Promise.all(
				uploadedPhotos.map(async ({ url }) => {
					const filePath = new URL(url).pathname.split('/').pop();
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
			throw new ApiError('Failed to update spot', 'NO_DATA');
		}

		return spot;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while updating the spot',
			'UNKNOWN_ERROR',
		);
	}
};
