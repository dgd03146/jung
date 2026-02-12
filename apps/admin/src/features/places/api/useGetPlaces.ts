import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { placeKeys } from '@/fsd/shared';
import { fetchPlaces } from '../services/getPlaces';

export interface PlaceFilters {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	category?: string;
}

export function useGetPlaces(filters: PlaceFilters) {
	return useQuery({
		queryKey: placeKeys.list(filters),
		queryFn: () => fetchPlaces(filters),
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 60 * 24, // 24시간
		gcTime: 1000 * 60 * 60 * 24 * 7, // 7일
	});
}
