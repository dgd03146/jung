import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT, trpc } from '@/fsd/shared';

export const useCommentsQuery = (postId: string) => {
	return trpc.comment.getCommentsByPostId.useSuspenseInfiniteQuery(
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
};
