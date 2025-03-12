'use server';

import { caller } from '@/fsd/shared/api/trpc/server';

export async function deleteCommentAction(commentId: string) {
	await caller.comment.deleteComment({ commentId });
}
