import { checkRateLimit } from '../lib/rateLimiter';
import { publicProcedure, router } from '../lib/trpc';
import { trackInputSchema } from '../schemas/analytics';
import { analyticsService } from '../services/analytics';

export type { TrackEventInput } from '../schemas/analytics';

export const analyticsRouter = router({
	track: publicProcedure.input(trackInputSchema).mutation(async ({ input }) => {
		checkRateLimit(input.session_id || 'anon', 'analyticsTrack');
		await analyticsService.trackEvent(input);
		return { success: true };
	}),
});
