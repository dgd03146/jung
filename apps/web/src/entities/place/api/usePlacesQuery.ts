import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { PLACE_CACHE, PLACE_DEFAULTS } from '../config/places';

type QueryParams = {
	category_id?: string;
	sort?: 'latest' | 'oldest' | 'popular';
	q?: string;
	cat?: string;
};

export function usePlacesQuery(params: QueryParams) {
	const { sort, q, cat } = params;
	const trpc = useTRPC();

	const infiniteOptions = trpc.place.getAllPlaces.infiniteQueryOptions(
		{
			limit: PLACE_DEFAULTS.LIMIT,
			sort,
			cat,
			q,
		},
		{
			getNextPageParam: (lastPage) => {
				if (
					!lastPage.items.length ||
					lastPage.items.length < PLACE_DEFAULTS.LIMIT
				) {
					return undefined;
				}
				return lastPage.nextCursor;
			},
			staleTime: PLACE_CACHE.STALE_TIME,
			gcTime: PLACE_CACHE.GC_TIME,
		},
	);

	return useSuspenseInfiniteQuery(infiniteOptions);
}
