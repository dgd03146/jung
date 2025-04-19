'use server';

import { getApiUrl } from '@/fsd/shared/config';
import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

import type { CreateReplyInput } from '@jung/shared/types';

import { createClient } from '@/fsd/shared/api/supabase/server';
import { caller } from '@/fsd/shared/api/trpc/server';
import { getResendApiKey } from '@/fsd/shared/config';

const resendApiKey = getResendApiKey();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
if (!resendApiKey) {
	console.warn(
		'RESEND_API_KEY is not set. Email notifications will be disabled.',
	);
}

export async function createReplyAction(input: CreateReplyInput) {
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

		const newReply = await caller.comment.createComment({
			postId,
			content,
			parentId: parentCommentId,
			userId: user.id,
		});

		if (resend) {
			try {
				const { data: parentCommentData, error: parentCommentError } =
					await supabase
						.from('post_comments')
						.select('user_id')
						.eq('id', parentCommentId)
						.single();

				if (parentCommentError) {
					console.error('Error fetching parent comment:', parentCommentError);
					throw new Error('원 댓글 정보를 가져오는 데 실패했습니다.');
				}

				const parentAuthorId = parentCommentData?.user_id;

				if (parentAuthorId && parentAuthorId !== user.id) {
					const { data: parentAuthor, error: parentAuthorError } =
						await supabase
							.from('profiles')
							.select('email, full_name')
							.eq('id', parentAuthorId)
							.single();

					if (parentAuthorError) {
						console.error(
							'Error fetching parent author profile:',
							parentAuthorError,
						);
					}

					if (parentAuthor?.email) {
						await resend.emails.send({
							from: `JUNG Archive <${getApiUrl()}>`,
							to: parentAuthor.email,
							subject: '[JUNG Archive] 회원님의 댓글에 새 답글이 달렸습니다!',
							html: `
                                <p>회원님의 댓글에 <strong>${
																	user.user_metadata?.full_name ||
																	user.email ||
																	'누군가'
																}</strong>님이 새 답글을 남겼습니다:</p>
                                <div style="border-left: 2px solid #ccc; padding-left: 1em; margin: 1em 0;">
                                    ${content}
                                </div>
                                <p>
                                    <a href="${getApiUrl()}/blog/${postId}"> 
                                        답글 확인하러 가기
                                    </a>
                                </p>
                                <hr>
                                <p style="font-size: 0.8em; color: #777;">
                                    이 알림은 회원님의 댓글에 답글이 달렸을 때 발송됩니다. 
                                </p>
                            `,
						});
						console.log(
							`Reply notification email sent to ${parentAuthor.email}`,
						);
					}
				}
			} catch (emailError: unknown) {
				if (emailError instanceof Error) {
					console.error(
						'Failed to send reply notification email:',
						emailError.message,
					);
				} else {
					console.error(
						'Failed to send reply notification email:',
						String(emailError),
					);
				}
			}
		}

		revalidatePath(`/blog/${postId}`);

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
