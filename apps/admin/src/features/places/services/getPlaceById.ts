import type { Place } from '@jung/shared/types';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const getPlaceById = async (id: string): Promise<Place> => {
	const { data: place, error } = await supabase
		.from('places')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!place) {
		throw new ApiError('Place not found', 'NOT_FOUND');
	}

	return place;
};
