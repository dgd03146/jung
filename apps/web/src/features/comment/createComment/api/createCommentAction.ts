'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';

export async function createCommentAction(
	postId: string,
	content: string,
	userId: string,
	parentId?: string,
) {
	const newComment = await trpc.comment.createComment({
		postId,
		content,
		userId,
		parentId,
	});

	return newComment;
}
