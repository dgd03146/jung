'use server';

import { trpc } from '@/fsd/shared/trpc/lib/server';
import { revalidatePath } from 'next/cache';

export async function deleteCommentAction(commentId: string, postId: string) {
	await trpc.comment.deleteComment(commentId);

	revalidatePath(`/blog/${postId}`);
}
