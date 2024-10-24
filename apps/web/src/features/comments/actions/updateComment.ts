'use server';

import { trpc } from '@/fsd/shared/trpc/lib/server';
import { revalidatePath } from 'next/cache';

export async function updateComment(
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
