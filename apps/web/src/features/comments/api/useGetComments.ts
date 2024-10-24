import { trpc } from '@/fsd/shared';

export const useGetCommentsQuery = (postId: string) => {
	return trpc.comment.getCommentsByPostId.useSuspenseInfiniteQuery(
		{ postId, order: 'desc' },
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);
};
