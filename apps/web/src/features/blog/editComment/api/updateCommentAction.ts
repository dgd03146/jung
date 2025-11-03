'use server';

import { caller } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function updateCommentAction({
	commentId,
	content,
	postId,
}: { commentId: string; content: string; postId: string }) {
	try {
		const updatedComment = await caller.postComment.updateComment({
			id: commentId,
			content,
		});

		revalidatePath(`/blog/${postId}`);

		return updatedComment;
	} catch (error) {
		console.error('Failed to update comment:', error);
		if (error instanceof Error) {
			throw new Error(`댓글 수정 실패: ${error.message}`);
		}
		throw new Error('댓글 수정 중 알 수 없는 오류가 발생했습니다.');
	}
}
