import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useTRPC } from '@/fsd/shared';
import { BLOG_CACHE, BLOG_DEFAULTS, type BlogSort } from '../config/blog';

type QueryParams = {
	cat?: string;
	sort?: BlogSort;
	q?: string;
};

export function usePostsQuery(params: QueryParams = {}) {
	const { cat, sort, q } = params;
	const locale = useLocale() as 'ko' | 'en';
	const trpc = useTRPC();

	const infiniteOptions = trpc.blog.getAllPosts.infiniteQueryOptions(
		{
			limit: BLOG_DEFAULTS.LIMIT,
			cat,
			sort,
			q,
			locale,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			staleTime: BLOG_CACHE.LIST.STALE_TIME,
			gcTime: BLOG_CACHE.LIST.GC_TIME,
		},
	);

	return useSuspenseInfiniteQuery(infiniteOptions);
}
