'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';

export async function toggleLikeCommentAction(
	commentId: string,
	postId: string,
	userId: string,
) {
	const updatedComment = await trpc.comment.toggleLike({
		commentId,
		userId: userId,
	});

	return updatedComment;
}
