'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';

export async function updateCommentAction(
	commentId: string,
	content: string,
	postId: string,
) {
	const updatedComment = await trpc.comment.updateComment({
		id: commentId,
		content,
	});

	return updatedComment;
}
