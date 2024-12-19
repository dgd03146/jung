import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { guestbookService } from '../services/guestbook';

export const guestbookRouter = router({
	getAllMessages: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(9),
				cursor: z.string().uuid().optional(),
			}),
		)
		.query(async ({ input }) => {
			const { limit, cursor } = input;

			return guestbookService.findMany({ limit, cursor });
		}),

	createMessage: publicProcedure
		.input(
			z.object({
				content: z.string().min(1).max(50).trim(),
				backgroundColor: z.string().optional(),
				emoji: z.string().optional(),
				userId: z.string(),
			}),
		)
		.mutation(({ input }) => {
			return guestbookService.create(input);
		}),
});
