'use server';

import { revalidatePath } from 'next/cache';
import { getCaller } from '@/fsd/shared/index.server';

export async function updateCommentAction({
	commentId,
	content,
	postId,
}: {
	commentId: string;
	content: string;
	postId: string;
}) {
	try {
		const updatedComment = await getCaller().postComment.updateComment({
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
