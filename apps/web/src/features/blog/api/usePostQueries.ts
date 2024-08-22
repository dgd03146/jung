import { trpc } from '@/fsd/shared';

export function usePostsQuery() {
	return trpc.post.getAllPosts.useSuspenseQuery(undefined, {
		staleTime: 1000 * 60 * 2, // 2분
		gcTime: 1000 * 60 * 10, // 10분
		refetchInterval: 1000 * 60 * 5, // 5분마다 자동 리페치
	});
}

export function usePostQuery(postId: string) {
	return trpc.post.getPostById.useSuspenseQuery(postId, {
		staleTime: 1000 * 60 * 5, // 5분
		gcTime: 1000 * 60 * 60, // 1시간
	});
}
