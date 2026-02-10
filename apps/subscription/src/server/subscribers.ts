import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { getServerSupabase } from './supabase';

const subscribeInput = z.object({
	email: z.string().email(),
	category: z.enum(['frontend', 'ai', 'both']),
});

export const subscribe = createServerFn({ method: 'POST' })
	.validator((data: z.infer<typeof subscribeInput>) =>
		subscribeInput.parse(data),
	)
	.handler(async ({ data }) => {
		const supabase = getServerSupabase();

		const { data: existing } = await supabase
			.from('subscribers')
			.select('id, is_active, category')
			.eq('email', data.email)
			.maybeSingle();

		if (existing) {
			if (existing.is_active && existing.category === data.category) {
				return { success: true, message: 'You are already subscribed!' };
			}

			const { error } = await supabase
				.from('subscribers')
				.update({
					category: data.category,
					is_active: true,
					updated_at: new Date().toISOString(),
					unsubscribed_at: null,
				})
				.eq('id', existing.id);

			if (error) {
				console.error('Subscribe update error:', error);
				return { success: false, message: 'Failed to update subscription.' };
			}

			return {
				success: true,
				message: existing.is_active
					? 'Subscription updated!'
					: 'Welcome back! You have been re-subscribed.',
			};
		}

		const { error } = await supabase
			.from('subscribers')
			.insert({ email: data.email, category: data.category });

		if (error) {
			console.error('Subscribe insert error:', error);
			return { success: false, message: 'Failed to subscribe.' };
		}

		return { success: true, message: 'Successfully subscribed!' };
	});

const unsubscribeInput = z.object({
	email: z.string().email(),
});

export const unsubscribe = createServerFn({ method: 'POST' })
	.validator((data: z.infer<typeof unsubscribeInput>) =>
		unsubscribeInput.parse(data),
	)
	.handler(async ({ data }) => {
		const supabase = getServerSupabase();

		const { error } = await supabase
			.from('subscribers')
			.update({
				is_active: false,
				unsubscribed_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			})
			.eq('email', data.email);

		if (error) {
			console.error('Unsubscribe error:', error);
			return { success: false, message: 'Failed to unsubscribe.' };
		}

		return { success: true, message: 'Successfully unsubscribed.' };
	});
