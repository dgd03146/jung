import { useTRPC } from '@/fsd/app';
import { useQuery } from '@tanstack/react-query';

export function usePostLikeQuery(postId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.post.getLikeInfo.queryOptions(postId, {
			staleTime: 10 * 1000, // 10초
			refetchOnMount: true,
			refetchOnWindowFocus: 'always',
			refetchOnReconnect: true,
		}),
	);
}
