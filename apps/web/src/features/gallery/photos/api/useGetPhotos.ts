import { trpc } from '@/fsd/shared';

type QueryParams = {
	sort?: 'latest' | 'popular';
	q?: string;
};

export function useGetPhotos(params: QueryParams = {}) {
	const { sort = 'latest', q = '' } = params;

	return trpc.photos.getAllPhotos.useSuspenseInfiniteQuery(
		{
			// FIXME: Limit 공통 파라미터로 변경
			limit: 8,
			sort,
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
