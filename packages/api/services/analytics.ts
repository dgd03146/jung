import { supabase } from '../lib/supabase';
import type { TrackEventInput } from '../schemas/analytics';

export const analyticsService = {
	async trackEvent(input: TrackEventInput) {
		const { error } = await supabase.from('analytics_events').insert(input);

		if (error) {
			console.error('Analytics tracking error:', error.message);
			return { success: false } as const;
		}
		return { success: true } as const;
	},
};
