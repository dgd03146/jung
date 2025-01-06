import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Collection } from '@jung/shared/types';

export const getCollections = async (): Promise<Collection[]> => {
	const { data, error } = await supabase
		.from('collections')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!data) {
		throw new ApiError('Failed to fetch collections', 'NO_DATA');
	}

	return data;
};
