import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { PostSchema } from '../schemas/post';
import { postService } from '../services/post';

export const postRouter = router({
	getAllPosts: publicProcedure.query(() => {
		return postService.findMany();
	}),

	getPostById: publicProcedure.input(z.string().uuid()).query(({ input }) => {
		return postService.findById(input);
	}),

	createPost: publicProcedure
		.input(PostSchema.omit({ id: true }))
		.mutation(({ input }) => {
			return postService.create(input);
		}),
});
