import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { newsletterService } from '../services/newsletter';

export const newsletterRouter = router({
	sendNewsletter: publicProcedure
		.input(
			z.object({
				articleId: z.string().uuid(),
				testEmail: z.string().email().optional(),
			}),
		)
		.mutation(({ input }) => {
			return newsletterService.sendNewsletter(input);
		}),

	getNewsletterLogs: publicProcedure
		.input(z.string().uuid())
		.query(({ input }) => {
			return newsletterService.getNewsletterLogs(input);
		}),

	getSubscriberStats: publicProcedure.query(() => {
		return newsletterService.getSubscriberStats();
	}),
});
