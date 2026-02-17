'use server';

import { revalidatePath } from 'next/cache';
import { getCaller } from '@/fsd/shared/index.server';

export async function updateAnonymousCommentAction({
	commentId,
	content,
	password,
	postId,
}: {
	commentId: string;
	content: string;
	password: string;
	postId: string;
}) {
	try {
		const result = await getCaller().postComment.updateAnonymousComment({
			commentId,
			content,
			password,
		});

		revalidatePath(`/blog/${postId}`);

		return result;
	} catch (error) {
		console.error('Failed to update anonymous comment:', error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('댓글 수정 중 알 수 없는 오류가 발생했습니다.');
	}
}
