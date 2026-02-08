import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { articleService } from '../services/article';

export const articleRouter = router({
	/**
	 * AI를 사용하여 아티클 내용 개선
	 */
	improveArticle: publicProcedure
		.input(
			z.object({
				title: z.string().min(1),
				summary: z.string().min(1),
				my_thoughts: z.string().nullable().optional(),
			}),
		)
		.mutation(({ input }) => {
			return articleService.improveArticle(input);
		}),
});
