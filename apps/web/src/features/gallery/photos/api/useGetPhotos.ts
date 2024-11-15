import { trpc } from '@/fsd/shared';

type QueryParams = {
	sort?: 'latest' | 'popular';
	q?: string;
};

export function useGetPhotos(params: QueryParams = {}) {
	const { sort = 'latest', q = '' } = params;

	return trpc.photos.getAllPhotos.useSuspenseInfiniteQuery(
		{
			limit: 20,
			sort,
			q,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}
