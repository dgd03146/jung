'use server';

import { caller } from '@/fsd/shared/api/trpc/server';

export async function createCommentAction(
	postId: string,
	content: string,
	userId: string,
	parentId?: string,
) {
	const newComment = await caller.comment.createComment({
		postId,
		content,
		userId,
		parentId,
	});

	return newComment;
}
