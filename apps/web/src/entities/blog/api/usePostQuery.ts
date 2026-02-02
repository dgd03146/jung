import { useSuspenseQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useTRPC } from '@/fsd/app';
import { BLOG_CACHE } from '../config/blog';

export function usePostQuery(postId: string) {
	const locale = useLocale() as 'ko' | 'en';
	const trpc = useTRPC();
	return useSuspenseQuery(
		trpc.blog.getPostById.queryOptions(
			{
				postId,
				locale,
			},
			{
				staleTime: BLOG_CACHE.DETAIL.STALE_TIME,
				gcTime: BLOG_CACHE.DETAIL.GC_TIME,
			},
		),
	);
}
