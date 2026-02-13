import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { publicProcedure, router } from '../lib/trpc';

export const subscriberRouter = router({
	getSubscribers: publicProcedure
		.input(
			z.object({
				page: z.number().default(0),
				pageSize: z.number().default(10),
				filter: z.string().optional(),
				category: z.enum(['frontend', 'ai', 'both']).optional(),
				isActive: z.boolean().optional(),
			}),
		)
		.query(async ({ input }) => {
			const { page, pageSize, filter, category, isActive } = input;
			const from = page * pageSize;
			const to = from + pageSize - 1;

			let query = supabase.from('subscribers').select('*', { count: 'exact' });

			if (filter) {
				const escaped = filter
					.replace(/[%_]/g, (char) => `\\${char}`)
					.replace(/[(),.']/g, '');
				if (/^[\w\s\-@.+]+$/.test(escaped)) {
					query = query.ilike('email', `%${escaped}%`);
				}
			}

			if (category) {
				query = query.eq('category', category);
			}

			if (isActive !== undefined) {
				query = query.eq('is_active', isActive);
			}

			query = query.order('created_at', { ascending: false }).range(from, to);

			const { data, error, count } = await query;

			if (error) {
				console.error('Failed to fetch subscribers:', error.message);
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch subscribers',
				});
			}

			const totalCount = count ?? 0;
			const totalPages = Math.ceil(totalCount / pageSize);

			return {
				subscribers: data || [],
				totalCount,
				totalPages,
				hasMore: page < totalPages - 1,
			};
		}),

	deleteSubscriber: publicProcedure
		.input(z.string().uuid())
		.mutation(async ({ input: id }) => {
			const { error } = await supabase
				.from('subscribers')
				.delete()
				.eq('id', id);

			if (error) {
				console.error('Failed to delete subscriber:', error.message);
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to delete subscriber',
				});
			}

			return { success: true };
		}),
});
