import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { BLOG_CACHE } from '../config/blog';

export function usePostQuery(postId: string) {
	const trpc = useTRPC();
	return useSuspenseQuery(
		trpc.blog.getPostById.queryOptions(
			{
				postId,
			},
			{
				staleTime: BLOG_CACHE.DETAIL.STALE_TIME,
				gcTime: BLOG_CACHE.DETAIL.GC_TIME,
			},
		),
	);
}
