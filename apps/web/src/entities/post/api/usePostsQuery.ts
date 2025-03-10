import { useTRPC } from '@/fsd/app';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { BLOG_DEFAULTS, type BlogSort } from '../config/blog';

type QueryParams = {
	cat?: string;
	sort?: BlogSort;
	q?: string;
};

export function usePostsQuery(params: QueryParams = {}) {
	const { cat, sort, q } = params;
	const trpc = useTRPC();

	const infiniteOptions = trpc.post.getAllPosts.infiniteQueryOptions(
		{
			limit: BLOG_DEFAULTS.LIMIT,
			cat,
			sort,
			q,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);

	return useSuspenseInfiniteQuery(infiniteOptions);
}
