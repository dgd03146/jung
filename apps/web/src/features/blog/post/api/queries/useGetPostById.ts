import { trpc } from '@/fsd/shared';

// FIXME: 포스트 하나 조회 훅으로 빼기
export function useGetPostById(postId: string) {
	return trpc.post.getPostById.useSuspenseQuery(postId, {
		staleTime: 1000 * 60 * 5, // 5분
		gcTime: 1000 * 60 * 60, // 1시간
	});
}
