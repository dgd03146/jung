'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function deleteCommentAction(commentId: string, postId: string) {
	await trpc.comment.deleteComment(commentId);

	revalidatePath(`/blog/${postId}`);
}
