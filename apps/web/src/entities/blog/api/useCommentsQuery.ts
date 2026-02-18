import { useInfiniteQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '../config/comment';

export const getCommentsQueryInput = (postId: string) => ({
	postId,
	order: COMMENTS_DEFAULT_ORDER,
	limit: COMMENTS_LIMIT,
});

export const useCommentsQuery = (postId: string) => {
	const trpc = useTRPC();

	const infiniteOptions =
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions(
			getCommentsQueryInput(postId),
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
