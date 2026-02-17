import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { LIKE_QUERY_OPTIONS } from '@/fsd/shared/api';

export function usePostLikeQuery(postId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.blog.getLikeInfo.queryOptions(postId, LIKE_QUERY_OPTIONS),
	);
}
