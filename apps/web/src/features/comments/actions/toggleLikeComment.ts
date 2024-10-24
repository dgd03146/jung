'use server';

import { trpc } from '@/fsd/shared/trpc/lib/server';
import { revalidatePath } from 'next/cache';

export async function toggleLikeComment(
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
