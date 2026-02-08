import type { Place, PlaceImageUpload } from '@jung/shared/types';
import { supabase } from '@/fsd/shared';
import { deleteFromR2 } from '@/fsd/shared/lib';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { uploadPlaceImage } from '../lib/uploadImage';
import type { PlaceTranslation } from './createPlace';

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
	translations?: PlaceTranslation;
}

export const updatePlace = async (input: UpdatePlaceInput): Promise<Place> => {
	try {
		// 새 이미지 업로드
		const newImages = input.images.filter(
			(img) => img.status === 'new' && img.file,
		);
		const uploadedPhotos = await Promise.all(
			newImages.map(async (image) => {
				const { key } = await uploadPlaceImage(image.file!);
				return { url: key }; // 기존 스키마 호환
			}),
		);

		// 기존 이미지 유지
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
				title_en: input.translations?.title_en ?? null,
				description_en: input.translations?.description_en ?? null,
				address_en: input.translations?.address_en ?? null,
				tags_en: input.translations?.tags_en ?? null,
				tips_en: input.translations?.tips_en ?? null,
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
			// 실패 시 새로 업로드한 이미지만 삭제
			await Promise.all(
				uploadedPhotos.map(async ({ url }) => {
					await deleteFromR2(url);
				}),
			);
			throw ApiError.fromPostgrestError(placeError);
		}

		if (!place) {
			throw new ApiError('Failed to update place', 'NO_DATA');
		}

		return {
			...place,
			category: place.category_id ?? '',
			category_id: place.category_id ?? undefined,
			photos:
				(place.photos as Array<{ url: string; id?: string }> | null)?.map(
					(p) => ({ ...p, status: 'existing' as const }),
				) ?? [],
			coordinates: place.coordinates as { lat: number; lng: number },
			likes: place.likes ?? 0,
			liked_by: place.liked_by ?? [],
			tags: place.tags ?? undefined,
			tips: place.tips ?? undefined,
		};
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
