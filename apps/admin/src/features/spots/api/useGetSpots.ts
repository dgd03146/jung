import { spotKeys } from '@/fsd/shared';
import type { Spot } from '@jung/shared/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchSpots } from '../services/getSpots';

interface SpotFilters {
	page: number;
	pageSize: number;
	sortField?: keyof Spot;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export function useGetSpots(filters: SpotFilters) {
	return useQuery({
		queryKey: spotKeys.list(filters),
		queryFn: () => fetchSpots(filters),
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 60 * 24, // 24시간
		gcTime: 1000 * 60 * 60 * 24 * 7, // 7일
	});
}
