import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { PLACE_CACHE } from '../config/places';

export function usePlaceQuery(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.place.getPlaceById.queryOptions(id, {
			staleTime: PLACE_CACHE.STALE_TIME,
			gcTime: PLACE_CACHE.GC_TIME,
		}),
	);
}
