'use server';

import { caller } from '@/fsd/shared/api/trpc/server';
import {
	getApiUrl,
	getResendApiKey,
	getResendEmailFrom,
} from '@/fsd/shared/config';
import type { CreateReplyInput } from '@jung/shared/types';

import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { createReplyAction } from './createReplyAction';

const resendApiKey = getResendApiKey();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
if (!resendApiKey) {
	console.warn(
		'(createCommentAction) RESEND_API_KEY is not set. Owner notifications will be disabled.',
	);
}

export async function createCommentAction(
	postId: string,
	content: string,
	userId: string,
	parentId?: string,
) {
	try {
		if (parentId) {
			const replyInput: CreateReplyInput = {
				postId,
				content,
				parentCommentId: parentId,
			};
			const replyResult = await createReplyAction(replyInput);
			return replyResult;
		}

		const newComment = await caller.comment.createComment({
			postId,
			content,
			userId,
		});

		if (resend) {
			try {
				await resend.emails.send({
					from: `JUNG Archive Notification <${getApiUrl()}>`,
					to: getResendEmailFrom(),
					subject: `[JUNG Archive] 새 댓글 알림 (Post ID: ${postId})`,
					html: `
                        <p>새 댓글이 작성되었습니다.</p>
                        <ul>
                            <li><strong>Post ID:</strong> ${postId}</li>
                            <li><strong>User ID:</strong> ${userId}</li> 
                            {/* Optionally fetch user email/name here if needed */}
                        </ul>
                        <p><strong>내용:</strong></p>
                        <div style="border-left: 2px solid #ccc; padding-left: 1em; margin: 1em 0;">
                            ${content}
                        </div>
                        <p>
                            <a href="${getApiUrl()}/blog/${postId}">게시글 보러가기</a>
                        </p>
                    `,
				});
				console.log('Admin notification email sent for new comment.');
			} catch (emailError: unknown) {
				console.error('Failed to send admin notification email:', emailError);
			}
		}

		revalidatePath(`/blog/${postId}`);

		return newComment;
	} catch (error) {
		console.error('Failed to process comment action:', error);

		if (error instanceof Error) {
			throw new Error(`댓글 처리 실패: ${error.message}`);
		}
		throw new Error('댓글 처리 중 알 수 없는 오류가 발생했습니다.');
	}
}
