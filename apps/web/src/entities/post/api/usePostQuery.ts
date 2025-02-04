import { trpc } from '@/fsd/shared';

export function usePostQuery(postId: string) {
	return trpc.post.getPostById.useSuspenseQuery(postId, {
		staleTime: 1000 * 60 * 5, // 5분
		gcTime: 1000 * 60 * 60, // 1시간
	});
}
