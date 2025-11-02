import { useTRPC } from '@/fsd/app';
import { LIKE_QUERY_OPTIONS } from '@/fsd/shared/api';
import { useQuery } from '@tanstack/react-query';

export function usePostLikeQuery(postId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.blog.getLikeInfo.queryOptions(postId, LIKE_QUERY_OPTIONS),
	);
}
