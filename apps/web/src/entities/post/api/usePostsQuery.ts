import { trpc } from '@/fsd/shared';

type QueryParams = {
	cat?: string;
	sort?: 'latest' | 'oldest' | 'popular';
	q?: string;
};

export function usePostsQuery(params: QueryParams = {}) {
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
		},
	);
}
