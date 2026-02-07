import type { Place } from '@jung/shared/types';
import { supabase } from '@/fsd/shared';
import { deleteFromR2 } from '@/fsd/shared/lib';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
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
		// R2에 업로드하고 key 배열 생성
		const uploadedPhotos = await Promise.all(
			input.files.map(async (file) => {
				const { key } = await uploadPlaceImage(file);
				return { url: key }; // 기존 스키마 호환을 위해 url 필드에 key 저장
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
			// 실패 시 업로드된 이미지 삭제
			await Promise.all(
				uploadedPhotos.map(async (photo) => {
					await deleteFromR2(photo.url);
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
