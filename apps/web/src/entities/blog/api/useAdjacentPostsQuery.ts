import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';

export const useAdjacentPostsQuery = (postId: string) => {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.blog.getAdjacentPosts.queryOptions(
			{
				postId,
			},
			{
				staleTime: 5 * 60 * 1000,
				gcTime: 1000 * 60 * 60 * 24,
			},
		),
	);
};
