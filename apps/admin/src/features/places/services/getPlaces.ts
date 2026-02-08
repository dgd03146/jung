import type { Place } from '@jung/shared/types';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export interface PlaceFilters {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export const fetchPlaces = async ({
	page,
	pageSize,
	sortField = 'created_at',
	sortOrder = 'desc',
	filter,
}: PlaceFilters): Promise<{
	places: Place[];
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}> => {
	const from = page * pageSize;
	const to = from + pageSize - 1;

	let query = supabase.from('places').select('*', { count: 'exact' });

	if (sortField) {
		query = query.order(sortField, { ascending: sortOrder === 'asc' });
	}

	if (filter) {
		query = query.or(
			`title.ilike.%${filter}%,description.ilike.%${filter}%,address.ilike.%${filter}%`,
		);
	}

	query = query.range(from, to);

	const { data, error, count } = await query;

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const hasMore = page < totalPages - 1;

	if (!data) {
		return {
			places: [],
			totalCount: 0,
			totalPages: 0,
			hasMore: false,
		};
	}

	const places: Place[] = data.map((place) => ({
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
	}));

	return {
		places,
		totalCount,
		totalPages,
		hasMore,
	};
};
