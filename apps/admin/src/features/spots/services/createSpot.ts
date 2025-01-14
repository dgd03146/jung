import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Spot } from '@jung/shared/types';

type CreateSpotInput = Omit<
	Spot,
	'id' | 'created_at' | 'updated_at' | 'likes' | 'liked_by'
>;

export const createSpot = async (data: CreateSpotInput): Promise<Spot> => {
	const { data: newSpot, error } = await supabase
		.from('spots')
		.insert([
			{
				title: data.title,
				description: data.description,
				address: data.address,
				photos: data.photos,
				coordinates: data.coordinates,
				category_id: data.category_id,
				tags: data.tags || [],
				tips: data.tips || [],
				likes: 0,
				liked_by: [],
			},
		])
		.select()
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!newSpot) {
		throw new ApiError('Failed to create spot', 'INTERNAL_SERVER_ERROR');
	}

	return newSpot;
};
