import type { Photo } from '@jung/shared/types';
import { mapDbPhotoToPhoto } from '@/fsd/features/gallery/lib';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

interface PhotoFilters {
	page: number;
	pageSize: number;
	sortField?: keyof Photo;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export const fetchPhotos = async ({
	page,
	pageSize,
	sortField = 'created_at',
	sortOrder = 'desc',
	filter,
}: PhotoFilters): Promise<{
	photos: Photo[];
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}> => {
	const from = page * pageSize;
	const to = from + pageSize - 1;

	let query = supabase.from('photos').select('*', { count: 'exact' });

	if (sortField) {
		query = query.order(sortField, { ascending: sortOrder === 'asc' });
	}

	if (filter) {
		query = query.or(
			`title.ilike.%${filter}%,description.ilike.%${filter}%,tags.cs.{${filter}}`,
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
			photos: [],
			totalCount: 0,
			totalPages: 0,
			hasMore: false,
		};
	}

	return {
		photos: data.map(mapDbPhotoToPhoto),
		totalCount,
		totalPages,
		hasMore,
	};
};
