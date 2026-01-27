import { PostSchema } from '@jung/shared/types';
import { z } from 'zod';
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
		.input(z.object({ postId: z.string(), userId: z.string() }))
		.mutation(({ input }) => {
			return blogService.toggleLike(input);
		}),

	getAdjacentPosts: publicProcedure
		.input(z.object({ postId: z.string() }))
		.query(({ input }) => {
			return blogService.getAdjacentPosts(input);
		}),
});
