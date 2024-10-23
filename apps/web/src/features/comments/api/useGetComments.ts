import { trpc } from '@/fsd/shared';

export const useGetCommentsQuery = (postId: string) => {
	return trpc.comment.getCommentsByPostId.useSuspenseInfiniteQuery(
		{ postId },
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);
};
