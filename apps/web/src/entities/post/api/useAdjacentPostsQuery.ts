import { trpc } from '@/fsd/shared';

export const useAdjacentPostsQuery = (postId: string) => {
	return trpc.post.getAdjacentPosts.useSuspenseQuery(postId, {
		staleTime: 5 * 60 * 1000,
	});
};
