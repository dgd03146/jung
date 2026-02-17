'use server';

import { revalidatePath } from 'next/cache';
import { getCaller } from '@/fsd/shared/index.server';

export async function deleteAnonymousCommentAction({
	commentId,
	password,
	postId,
}: {
	commentId: string;
	password: string;
	postId: string;
}) {
	try {
		await getCaller().postComment.deleteAnonymousComment({
			commentId,
			password,
		});

		revalidatePath(`/blog/${postId}`);

		return { success: true };
	} catch (error) {
		console.error('Failed to delete anonymous comment:', error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('댓글 삭제 중 알 수 없는 오류가 발생했습니다.');
	}
}
