'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

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

	revalidatePath(`/blog/${postId}`);
	return newComment;
}
