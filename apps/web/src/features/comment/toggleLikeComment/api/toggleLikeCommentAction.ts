'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function toggleLikeCommentAction(
	commentId: string,
	postId: string,
	userId: string,
) {
	const updatedComment = await trpc.comment.toggleLike({
		commentId,
		userId: userId,
	});

	revalidatePath(`/blog/${postId}`);
	return updatedComment;
}
