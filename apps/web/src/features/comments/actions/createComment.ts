'use server';

import { trpc } from '@/fsd/shared/trpc/lib/server';
import { revalidatePath } from 'next/cache';

export async function createComment(
	postId: string,
	content: string,
	userId: string,
) {
	const newComment = await trpc.comment.createComment({
		postId,
		content,
		userId,
	});

	revalidatePath(`/blog/${postId}`);
	return newComment;
}
