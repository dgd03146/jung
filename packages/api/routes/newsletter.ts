import { z } from 'zod';
import { protectedProcedure, router } from '../lib/trpc';
import { newsletterService } from '../services/newsletter';

export const newsletterRouter = router({
	sendNewsletter: protectedProcedure
		.input(
			z.object({
				articleId: z.string().uuid(),
				testEmail: z.string().email().optional(),
			}),
		)
		.mutation(({ input }) => {
			return newsletterService.sendNewsletter(input);
		}),

	getNewsletterLogs: protectedProcedure
		.input(z.string().uuid())
		.query(({ input }) => {
			return newsletterService.getNewsletterLogs(input);
		}),

	getSubscriberStats: protectedProcedure.query(() => {
		return newsletterService.getSubscriberStats();
	}),
});
