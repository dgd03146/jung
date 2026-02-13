import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { analyticsService } from '../services/analytics';

const trackInputSchema = z.object({
	event_name: z.string().min(1).max(100),
	event_category: z.enum([
		'navigation',
		'engagement',
		'content',
		'interaction',
	]),
	page_path: z.string().max(2000).optional(),
	page_title: z.string().max(500).optional(),
	referrer: z.string().max(2000).optional(),
	resource_type: z
		.enum(['post', 'photo', 'place', 'guestbook', 'comment'])
		.optional(),
	resource_id: z.string().max(200).optional(),
	session_id: z.string().max(200).optional(),
	locale: z.enum(['ko', 'en']).optional(),
	properties: z
		.record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
		.optional(),
});

export type TrackEventInput = z.infer<typeof trackInputSchema>;

export const analyticsRouter = router({
	track: publicProcedure.input(trackInputSchema).mutation(async ({ input }) => {
		await analyticsService.trackEvent(input);
		return { success: true };
	}),
});
