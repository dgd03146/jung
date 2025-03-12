'use server';

import { caller } from '@/fsd/shared/api/trpc/server';

export async function updateCommentAction(commentId: string, content: string) {
	const updatedComment = await caller.comment.updateComment({
		id: commentId,
		content,
	});

	return updatedComment;
}
