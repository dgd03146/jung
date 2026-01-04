'use server';

import { revalidatePath } from 'next/cache';
import { caller } from '@/fsd/shared/api/trpc/server';

export async function deleteCommentAction({
	commentId,
	postId,
}: {
	commentId: string;
	postId: string;
}) {
	try {
		await caller.postComment.deleteComment({ commentId });

		revalidatePath(`/blog/${postId}`);

		return { success: true };
	} catch (error) {
		console.error('Failed to delete comment:', error);
		if (error instanceof Error) {
			throw new Error(`댓글 삭제 실패: ${error.message}`);
		}
		throw new Error('댓글 삭제 중 알 수 없는 오류가 발생했습니다.');
	}
}
