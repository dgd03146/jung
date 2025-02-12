import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Spot } from '@jung/shared/types';

export const getSpotById = async (id: string): Promise<Spot> => {
	const { data: spot, error } = await supabase
		.from('spots')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!spot) {
		throw new ApiError('Spot not found', 'NOT_FOUND');
	}

	return spot;
};
