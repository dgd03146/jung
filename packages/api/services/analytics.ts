import { supabase } from '../lib/supabase';
import type { TrackEventInput } from '../routes/analytics';

export const analyticsService = {
	async trackEvent(input: TrackEventInput) {
		const { error } = await supabase.from('analytics_events').insert(input);

		if (error) {
			console.error('Analytics tracking error:', error.message);
		}
	},
};
