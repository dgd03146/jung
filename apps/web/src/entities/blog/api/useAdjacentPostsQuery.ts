import { useTRPC } from '@/fsd/app';
import { useSuspenseQuery } from '@tanstack/react-query';

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
