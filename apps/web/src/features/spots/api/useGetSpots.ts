import { trpc } from '@/fsd/shared';

type QueryParams = {
	category_id?: string;
	sort?: 'latest' | 'oldest' | 'popular';
	q?: string;
	cat?: string;
};

export function useGetSpots(params: QueryParams) {
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
				if (lastPage.nextCursor === null) {
					return undefined;
				}
				return lastPage.nextCursor;
			},
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}
