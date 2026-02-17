import { useQuery } from '@tanstack/react-query';
import { LIKE_QUERY_OPTIONS, useTRPC } from '@/fsd/shared';

export function usePostLikeQuery(postId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.blog.getLikeInfo.queryOptions(postId, LIKE_QUERY_OPTIONS),
	);
}
