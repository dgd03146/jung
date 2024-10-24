'use server';

import { trpc } from '@/fsd/shared/trpc/lib/server';
import { revalidatePath } from 'next/cache';

export async function deleteComment(commentId: string, postId: string) {
	await trpc.comment.deleteComment(commentId);

	revalidatePath(`/blog/${postId}`);
}
