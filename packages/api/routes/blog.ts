import { PostSchema } from '@jung/shared/types';
import { z } from 'zod';
import { checkRateLimit } from '../lib/rateLimiter';
import { publicProcedure, router } from '../lib/trpc';
import { blogService } from '../services/blog';

export const blogRouter = router({
	getAllPosts: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100),
				cursor: z.number().optional(),
				cat: z.string().optional(),
				sort: z.enum(['latest', 'oldest', 'popular']).default('latest'),
				q: z.string().optional(),
				locale: z.enum(['ko', 'en']).optional().default('ko'),
			}),
		)
		.query(async (opts) => {
			const { input } = opts;

			const { limit, cat, sort, q, cursor, locale } = input;
			return blogService.findMany({ limit, cursor, cat, sort, q, locale });
		}),

	getPostById: publicProcedure
		.input(
			z.object({
				postId: z.string(),
				locale: z.enum(['ko', 'en']).optional().default('ko'),
			}),
		)
		.query(({ input }) => {
			return blogService.findById(input);
		}),

	getLikeInfo: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return blogService.getLikeInfo(input);
	}),

	createPost: publicProcedure
		.input(PostSchema.omit({ id: true }))
		.mutation(({ input }) => {
			return blogService.create(input);
		}),

	toggleLike: publicProcedure
		.input(
			z
				.object({
					postId: z.string(),
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
			return blogService.toggleLike({
				postId: input.postId,
				identifier,
			});
		}),

	getAdjacentPosts: publicProcedure
		.input(z.object({ postId: z.string() }))
		.query(({ input }) => {
			return blogService.getAdjacentPosts(input);
		}),
});
