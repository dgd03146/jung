import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';

export const useCommentsQuery = (postId: string) => {
	return trpc.comment.getCommentsByPostId.useSuspenseInfiniteQuery(
		{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);
};
