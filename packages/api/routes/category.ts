import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { categoryService } from '../services/category';

export const categoryRouter = router({
	getCategories: publicProcedure
		.input(
			z.object({
				type: z.enum(['blog', 'places']).default('blog'),
			}),
		)
		.query(async ({ input }) => {
			const { type } = input;
			return categoryService.getCategories(type);
		}),
});
