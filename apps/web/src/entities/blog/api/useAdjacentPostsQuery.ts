import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { BLOG_CACHE } from '../config/blog';

export const useAdjacentPostsQuery = (postId: string) => {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.blog.getAdjacentPosts.queryOptions(
			{
				postId,
			},
			{
				staleTime: BLOG_CACHE.DETAIL.STALE_TIME,
				gcTime: BLOG_CACHE.DETAIL.GC_TIME,
			},
		),
	);
};
