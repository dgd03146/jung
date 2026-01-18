import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { BLOG_CACHE, BLOG_DEFAULTS, type BlogSort } from '../config/blog';

type QueryParams = {
	cat?: string;
	sort?: BlogSort;
	q?: string;
};

export function usePostsQuery(params: QueryParams = {}) {
	const { cat, sort, q } = params;
	const trpc = useTRPC();

	const infiniteOptions = trpc.blog.getAllPosts.infiniteQueryOptions(
		{
			limit: BLOG_DEFAULTS.LIMIT,
			cat,
			sort,
			q,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			staleTime: BLOG_CACHE.STALE_TIME,
			gcTime: BLOG_CACHE.GC_TIME,
		},
	);

	return useSuspenseInfiniteQuery(infiniteOptions);
}
