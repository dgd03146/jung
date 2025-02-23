import { trpc } from '@/fsd/shared';

type QueryParams = {
	category_id?: string;
	sort?: 'latest' | 'oldest' | 'popular';
	q?: string;
	cat?: string;
};

export function useSpotsQuery(params: QueryParams) {
	const { sort, q, cat } = params;

	return trpc.spot.getAllSpots.useSuspenseInfiniteQuery(
		{
			limit: 12,
			sort,
			cat,
			q,
		},
		{
			getNextPageParam: (lastPage) => {
				if (!lastPage.items.length || lastPage.items.length < 12) {
					return undefined;
				}
				return lastPage.nextCursor;
			},
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}
