import { trpc } from '@/fsd/app';

export function usePostsQuery() {
	return trpc.post.getAllPostsForAdmin.useSuspenseQuery(undefined, {
		staleTime: 1000 * 60 * 1, // 1분
		gcTime: 1000 * 60 * 10, // 10분 (유지)
		refetchInterval: 1000 * 60 * 3, // 3분마다 자동 리페치
	});
}
