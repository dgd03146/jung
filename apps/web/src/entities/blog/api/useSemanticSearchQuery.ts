import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useTRPC } from '@/fsd/app';
import { BLOG_CACHE } from '../config/blog';

type QueryParams = {
	query: string;
	limit?: number;
	mode?: 'vector' | 'keyword' | 'hybrid';
	enabled?: boolean;
};

export function useSemanticSearchQuery(params: QueryParams) {
	const { query, limit = 5, mode = 'hybrid', enabled = true } = params;
	const locale = useLocale() as 'ko' | 'en';
	const trpc = useTRPC();

	const queryOptions = trpc.blog.semanticSearch.queryOptions(
		{
			query,
			limit,
			mode,
			locale,
		},
		{
			staleTime: BLOG_CACHE.LIST.STALE_TIME,
			gcTime: BLOG_CACHE.LIST.GC_TIME,
			enabled: enabled && query.trim().length > 0,
		},
	);

	return useQuery(queryOptions);
}
