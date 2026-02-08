'use server';

import type { CreateReplyInput } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { CommentNotificationEmailTemplateInline } from '@/fsd/entities/blog';
import { formatDate, getUserDisplayName } from '@/fsd/shared';
import { getCaller } from '@/fsd/shared/api/trpc/server';
import { getResendApiKey, getSiteUrl } from '@/fsd/shared/config';
import { createClient } from '@/fsd/shared/index.server';
import { NO_REPLY_EMAIL } from '../config/constant';

const resendApiKey = getResendApiKey();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
if (!resendApiKey) {
	console.warn(
		'(createReplyAction) RESEND_API_KEY is not set. Reply notifications will be disabled.',
	);
}

export async function createReplyAction(input: CreateReplyInput, lang = 'ko') {
	const { parentCommentId, postId, content } = input;

	if (!parentCommentId || !postId || !content) {
		throw new Error('필수 입력값이 누락되었습니다.');
	}

	const supabase = await createClient();

	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			console.error('Supabase auth error:', authError);
			throw new Error('로그인이 필요합니다.');
		}

		const newReply = await getCaller().postComment.createComment({
			postId,
			content,
			parentId: parentCommentId,
			userId: user.id,
		});

		revalidatePath(`/blog/${postId}`);

		if (resend) {
			try {
				const { data: parentCommentData, error: parentCommentError } =
					await supabase
						.from('post_comments')
						.select('*')
						.eq('id', parentCommentId)
						.single();

				if (parentCommentError) {
					console.error('Error fetching parent comment:', parentCommentError);
				}

				const parentAuthorId = parentCommentData.user_id;

				const { data: parentAuthor, error: parentAuthorError } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', parentAuthorId)
					.single();

				if (parentAuthorError) {
					console.error(
						'Error fetching parent author profile:',
						parentAuthorError,
					);
				}

				if (parentAuthor?.email) {
					const replierName = getUserDisplayName(user);
					// const replierAvatarUrl = user.user_metadata?.avatar_url;

					const { error: emailError } = await resend.emails.send({
						from: `Jung Archive <${NO_REPLY_EMAIL}>`,
						to: parentAuthor.email,
						subject: '[JUNG Archive] 회원님의 댓글에 답글이 달렸습니다!',
						react: CommentNotificationEmailTemplateInline({
							emailTitle: '새 답글 알림',
							mainText: `${replierName}님이 회원님의 댓글에 답글을 남겼습니다.`,
							postUrl: `${getSiteUrl()}/${lang}/blog/${postId}`,
							// commentContent: newReply.content,
							commenterName: replierName,
							// commenterAvatarUrl: replierAvatarUrl,
							createdAt: formatDate(newReply.created_at),
							buttonText: '답글 확인하러 가기',
						}),
					});

					if (emailError) {
						console.error(
							`Failed to send reply notification email to ${parentAuthor.email}:`,
							emailError,
						);
					}
				} else {
					console.error(
						`Parent author (ID: ${parentAuthorId}) email not found. Skipping notification.`,
					);
				}
			} catch (emailCatchError) {
				console.error(
					'Error during reply notification email process:',
					emailCatchError,
				);
			}
		}

		return {
			id: newReply.id,
			content: newReply.content,
			created_at: newReply.created_at,
		};
	} catch (error: unknown) {
		console.error('Failed to create reply:', error);

		if (error instanceof TRPCError) {
			throw new Error(`서버 오류: ${error.message}`);
		}
		if (error instanceof Error) {
			throw new Error(`오류: ${error.message}`);
		}
		throw new Error('대댓글 작성 중 알 수 없는 오류가 발생했습니다.');
	}
}

export type CreateReplyResult = Awaited<ReturnType<typeof createReplyAction>>;
