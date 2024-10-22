import { trpc } from '@/fsd/shared';
import type { Comment } from '@jung/shared/types';

interface CommentsQueryResult {
	items: Comment[];
	nextCursor: string | null;
}

export function useGetCommentsQuery(postId: string) {
	return trpc.comment.getCommentsByPostId.useSuspenseQuery<CommentsQueryResult>(
		{ postId, limit: 10 },
		{
			staleTime: 1000 * 60 * 5, // 5분
			gcTime: 1000 * 60 * 30, // 30분
		},
	);
}
