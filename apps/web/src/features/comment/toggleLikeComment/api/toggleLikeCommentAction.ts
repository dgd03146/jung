'use server';

import { caller } from '@/fsd/shared/api/trpc/server';

export async function toggleLikeCommentAction(
	commentId: string,
	postId: string,
	userId: string,
) {
	const updatedComment = await caller.comment.toggleLike({
		commentId,
		userId: userId,
	});

	return updatedComment;
}
