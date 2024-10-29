import { trpc } from '@/fsd/shared';

type QueryParams = {
	cat?: string;
	sort?: 'latest' | 'oldest' | 'popular';
	q?: string;
};

export function useGetPosts(params: QueryParams = {}) {
	const { cat, sort, q } = params;

	return trpc.post.getAllPosts.useSuspenseInfiniteQuery(
		{
			limit: 9,
			cat,
			sort,
			q,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			// staleTime: 1000 * 60 * 2, // 2분
			// gcTime: 1000 * 60 * 10, // 10분
			// refetchInterval: 1000 * 60 * 5, // 5분마다 자동 리페치,
		},
	);
}
