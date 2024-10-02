import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { PostSchema } from '../schemas/post';
import { postService } from '../services/post';

export const postRouter = router({
	getAllPosts: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(10),
				cursor: z.number().optional(),
				cat: z.string().optional(),
				sort: z.enum(['latest', 'oldest', 'popular']).default('latest'),
				q: z.string().optional(),
			}),
		)
		.query(async (opts) => {
			const { input } = opts;

			const { limit, cat, sort, q, cursor } = input;
			return postService.findMany({ limit, cursor, cat, sort, q });
		}),

	getPostById: publicProcedure.input(z.string()).query(({ input }) => {
		return postService.findById(input);
	}),

	createPost: publicProcedure
		.input(PostSchema.omit({ id: true }))
		.mutation(({ input }) => {
			return postService.create(input);
		}),
});
