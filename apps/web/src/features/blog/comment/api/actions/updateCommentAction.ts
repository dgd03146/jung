'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function updateCommentAction(
	commentId: string,
	content: string,
	postId: string,
) {
	const updatedComment = await trpc.comment.updateComment({
		id: commentId,
		content,
	});

	revalidatePath(`/blog/${postId}`);
	return updatedComment;
}
