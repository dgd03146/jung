'use server';

import type { CreateReplyInput } from '@jung/shared/types';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

import { CommentNotificationEmailTemplateInline } from '@/fsd/entities/blog';
import { formatDate, getUserDisplayName } from '@/fsd/shared';
import { getCaller } from '@/fsd/shared/api/trpc/server';
import {
	getResendApiKey,
	getResendEmailFrom,
	getSiteUrl,
} from '@/fsd/shared/config';
import { createClient } from '@/fsd/shared/index.server';
import { NO_REPLY_EMAIL } from '../config/constant';
import { createReplyAction } from './createReplyAction';

const resendApiKey = getResendApiKey();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
if (!resendApiKey) {
	console.warn(
		'(createCommentAction) RESEND_API_KEY is not set. Comment notifications will be disabled.',
	);
}

export async function createCommentAction({
	postId,
	postTitle,
	content,
	userId,
	parentId,
}: {
	postId: string;
	content: string;
	userId: string;
	postTitle: string;
	parentId?: string;
}) {
	const supabase = await createClient();
	try {
		// reply comment logic
		if (parentId) {
			const replyInput: CreateReplyInput = {
				postId,
				content,
				parentCommentId: parentId,
			};
			const replyResult = await createReplyAction(replyInput);
			return replyResult;
		}

		// new comment logic
		const newComment = await getCaller().postComment.createComment({
			postId,
			content,
			userId,
		});

		revalidatePath(`/blog/${postId}`);

		// email logic
		if (resend) {
			try {
				const { data: commenterDataResult, error: userError } =
					await supabase.auth.admin.getUserById(userId);

				if (userError) {
					console.error('Error fetching commenter data:', userError);
				}

				const commenter = commenterDataResult?.user;
				const commenterName = commenter
					? getUserDisplayName(commenter)
					: 'Anonymous';
				// const commenterAvatarUrl = commenter?.user_metadata?.avatar_url;

				const { error: emailError } = await resend.emails.send({
					from: `Jung Archive <${NO_REPLY_EMAIL}>`,
					to: getResendEmailFrom(),
					subject: `[JUNG Archive] 새 댓글: ${postTitle || postId}`,
					react: CommentNotificationEmailTemplateInline({
						emailTitle: '새 댓글이 달렸습니다!',
						mainText: `${commenterName}님이 '${
							postTitle || '게시글'
						}'에 댓글을 남겼습니다.`,
						postUrl: `${getSiteUrl()}/blog/${postId}`,
						// commentContent: newComment.content,
						commenterName: commenterName,
						// commenterAvatarUrl: commenterAvatarUrl,
						createdAt: formatDate(newComment.created_at),
						buttonText: '게시글에서 댓글 확인하기',
					}),
				});

				if (emailError) {
					return console.error(
						'Failed to send admin notification email:',
						emailError,
					);
				}
			} catch (emailCatchError) {
				console.error(
					'Error during admin notification email process:',
					emailCatchError,
				);
			}
		}

		return newComment;
	} catch (error) {
		console.error('Failed to process comment action:', error);

		if (error instanceof Error) {
			throw new Error(`댓글 처리 실패: ${error.message}`);
		}
		throw new Error('댓글 처리 중 알 수 없는 오류가 발생했습니다.');
	}
}
