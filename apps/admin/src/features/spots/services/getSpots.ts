import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Spot } from '@jung/shared/types';

interface SpotFilters {
	page: number;
	pageSize: number;
	sortField?: keyof Spot;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export const fetchSpots = async ({
	page,
	pageSize,
	sortField = 'created_at',
	sortOrder = 'desc',
	filter,
}: SpotFilters): Promise<{
	spots: Spot[];
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}> => {
	const from = page * pageSize;
	const to = from + pageSize - 1;

	let query = supabase.from('spots').select('*', { count: 'exact' });

	if (sortField) {
		query = query.order(sortField, { ascending: sortOrder === 'asc' });
	}

	if (filter) {
		query = query.or(
			`name.ilike.%${filter}%,description.ilike.%${filter}%,address.ilike.%${filter}%`,
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
			spots: [],
			totalCount: 0,
			totalPages: 0,
			hasMore: false,
		};
	}

	return {
		spots: data,
		totalCount,
		totalPages,
		hasMore,
	};
};
