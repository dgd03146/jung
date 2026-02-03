import {
	CreateAnonymousCommentInputSchema,
	DeleteAnonymousCommentInputSchema,
	UpdateAnonymousCommentInputSchema,
} from '@jung/shared/types';
import { z } from 'zod';
import { checkRateLimit } from '../lib/rateLimiter';
import { publicProcedure, router } from '../lib/trpc';

import { commentService } from '../services/comment';

export const commentRouter = router({
	// 게시물 ID로 댓글 조회
	getCommentsByPostId: publicProcedure
		.input(
			z.object({
				postId: z.string(),
				limit: z.number().min(1).max(100).default(50),
				cursor: z.string().optional(),
				order: z.enum(['asc', 'desc']).default('desc'),
			}),
		)
		.query(async ({ input }) => {
			const { postId, limit, cursor, order } = input;
			return commentService.findManyByPostId({ postId, limit, cursor, order });
		}),

	// 새 댓글 생성 (로그인 사용자)
	createComment: publicProcedure
		.input(
			z.object({
				postId: z.string(),
				content: z.string(),
				userId: z.string(),
				parentId: z.string().optional(),
			}),
		)
		.mutation(async ({ input }) => {
			checkRateLimit(input.userId, 'authenticatedComment');
			return commentService.create(input);
		}),

	// 익명 댓글 생성
	createAnonymousComment: publicProcedure
		.input(CreateAnonymousCommentInputSchema)
		.mutation(async ({ input }) => {
			checkRateLimit(input.anonymousId, 'anonymousComment');
			return commentService.createAnonymous(input);
		}),

	// 댓글 수정 (로그인 사용자)
	updateComment: publicProcedure
		.input(
			z.object({
				id: z.string(),
				content: z.string(),
			}),
		)
		.mutation(({ input }) => {
			return commentService.update(input.id, { content: input.content });
		}),

	// 익명 댓글 수정 (비밀번호 검증)
	updateAnonymousComment: publicProcedure
		.input(UpdateAnonymousCommentInputSchema)
		.mutation(({ input }) => {
			return commentService.updateAnonymous(input);
		}),

	// 댓글 삭제 (로그인 사용자)
	deleteComment: publicProcedure
		.input(z.object({ commentId: z.string() }))
		.mutation(({ input }) => {
			return commentService.delete(input);
		}),

	// 익명 댓글 삭제 (비밀번호 검증)
	deleteAnonymousComment: publicProcedure
		.input(DeleteAnonymousCommentInputSchema)
		.mutation(({ input }) => {
			return commentService.deleteAnonymous(input);
		}),

	// 댓글 좋아요 토글 (로그인 사용자 또는 익명 사용자)
	toggleLike: publicProcedure
		.input(
			z
				.object({
					commentId: z.string(),
					userId: z.string().optional(),
					anonymousId: z
						.string()
						.regex(/^anon_/)
						.optional(),
				})
				.refine((data) => data.userId || data.anonymousId, {
					message: 'userId 또는 anonymousId 중 하나는 필수입니다',
				}),
		)
		.mutation(({ input }) => {
			const identifier = input.userId || input.anonymousId!;
			const isAnonymous = identifier.startsWith('anon_');
			checkRateLimit(
				identifier,
				isAnonymous ? 'anonymousLike' : 'authenticatedLike',
			);
			return commentService.toggleLike({
				commentId: input.commentId,
				identifier,
			});
		}),
});
