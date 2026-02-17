import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getPlaceById } from '../services/getPlaceById';
import { fetchPlaces, type PlaceFilters } from '../services/getPlaces';

const PLACE_STALE_TIME_MS = 24 * 60 * 60_000; // 24시간
const PLACE_GC_TIME_MS = 7 * 24 * 60 * 60_000; // 7일

export const placeQueryOptions = {
	all: () => ['places'] as const,
	lists: () => [...placeQueryOptions.all(), 'list'] as const,
	list: (filters: PlaceFilters) =>
		queryOptions({
			queryKey: [...placeQueryOptions.lists(), filters] as const,
			queryFn: () => fetchPlaces(filters),
			placeholderData: keepPreviousData,
			staleTime: PLACE_STALE_TIME_MS,
			gcTime: PLACE_GC_TIME_MS,
		}),
	details: () => [...placeQueryOptions.all(), 'detail'] as const,
	detail: (id: string | undefined) =>
		queryOptions({
			queryKey: [...placeQueryOptions.details(), id] as const,
			queryFn: () => {
				if (!id) throw new Error('placeId is required');
				return getPlaceById(id);
			},
			enabled: !!id,
		}),
};
