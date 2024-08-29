import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { PostSchema } from '../schemas/post';
import { adminPostService } from '../services/admin/post';
import { postService } from '../services/web/post';

export const postRouter = router({
	getAllPosts: publicProcedure.query(() => {
		return postService.findMany();
	}),

	getAllPostsForAdmin: publicProcedure.query(() => {
		return adminPostService.findMany();
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
