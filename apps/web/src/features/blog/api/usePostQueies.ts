import { trpc } from '@/fsd/shared';

export function usePostsQuery() {
	return trpc.post.getAllPosts.useQuery();
}

export function usePostQuery(postId: string) {
	return trpc.post.getPostById.useQuery(postId);
}
