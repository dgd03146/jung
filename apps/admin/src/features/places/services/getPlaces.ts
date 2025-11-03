import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Place } from '@jung/shared/types';

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

	return {
		places: data,
		totalCount,
		totalPages,
		hasMore,
	};
};
