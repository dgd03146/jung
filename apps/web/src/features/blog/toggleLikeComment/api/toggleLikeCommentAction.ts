'use server';

import { caller } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function toggleLikeCommentAction({
	commentId,
	postId,
	userId,
}: {
	commentId: string;
	postId: string;
	userId: string;
}) {
	try {
		const updatedComment = await caller.postComment.toggleLike({
			commentId,
			userId: userId,
		});

		revalidatePath(`/blog/${postId}`);

		return updatedComment;
	} catch (error) {
		console.error('Failed to toggle comment like:', error);
		if (error instanceof Error) {
			throw new Error(`좋아요 처리 실패: ${error.message}`);
		}
		throw new Error('댓글 좋아요 처리 중 알 수 없는 오류가 발생했습니다.');
	}
}
