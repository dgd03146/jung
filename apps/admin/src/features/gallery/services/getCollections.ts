import type { Collection } from '@jung/shared/types';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const getCollections = async (): Promise<Collection[]> => {
	const { data, error } = await supabase
		.from('collections')
		.select(`
				id,
				title,
				description,
				cover_image,
				created_at,
				collection_photos (
					count
				)
			`)
		.order('created_at', { ascending: false });

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!data) {
		throw new ApiError('Failed to fetch collections', 'NO_DATA');
	}

	return data.map((collection) => ({
		id: collection.id,
		title: collection.title,
		description: collection.description ?? '',
		cover_image: collection.cover_image,
		created_at: collection.created_at ?? new Date().toISOString(),
		photo_count: collection.collection_photos[0].count,
	}));
};
