'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';

export async function deleteCommentAction(commentId: string, postId: string) {
	await trpc.comment.deleteComment(commentId);
}
