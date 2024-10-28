import { trpc } from '@/fsd/shared';

export const useGetAdjacentPosts = (postId: string) => {
	return trpc.post.getAdjacentPosts.useQuery(postId, {
		staleTime: 5 * 60 * 1000,
	});
};
