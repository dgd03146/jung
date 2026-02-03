import { z } from 'zod';
import { checkRateLimit } from '../lib/rateLimiter';
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

	createAnonymousMessage: publicProcedure
		.input(
			z.object({
				content: z.string().min(1).max(50).trim(),
				backgroundColor: z.string().optional(),
				emoji: z.string().optional(),
				anonymousId: z
					.string()
					.regex(/^anon_/, '익명 ID는 anon_로 시작해야 합니다'),
				nickname: z.string().min(1, '닉네임을 입력해주세요').max(20),
			}),
		)
		.mutation(({ input }) => {
			// Rate Limiting 적용
			checkRateLimit(input.anonymousId, 'anonymousGuestbook');

			return guestbookService.createAnonymous(input);
		}),
});
