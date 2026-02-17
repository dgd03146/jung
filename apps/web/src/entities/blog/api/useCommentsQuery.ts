import { useInfiniteQuery } from '@tanstack/react-query';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT, useTRPC } from '@/fsd/shared';

export const useCommentsQuery = (postId: string) => {
	const trpc = useTRPC();

	const infiniteOptions =
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions(
			{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
			{
				getNextPageParam: (lastPage) => {
					if (!lastPage.hasNextPage) return undefined;
					return lastPage.nextCursor;
				},
				staleTime: 10 * 60 * 1000, // 10분
				gcTime: 60 * 60 * 1000, // 1시간
			},
		);

	return useInfiniteQuery(infiniteOptions);
};
