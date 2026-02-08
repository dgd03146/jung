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
};
