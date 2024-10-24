import { z } from 'zod';
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

	// 새 댓글 생성
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
			return commentService.create(input);
		}),

	// 댓글 수정
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

	// 댓글 삭제
	deleteComment: publicProcedure.input(z.string()).mutation(({ input }) => {
		return commentService.delete(input);
	}),

	// 댓글 좋아요 토글
	toggleLike: publicProcedure
		.input(z.object({ commentId: z.string(), userId: z.string() }))
		.mutation(({ input }) => {
			return commentService.toggleLike(input);
		}),
});
