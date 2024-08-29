import { TRPCError } from '@trpc/server';
import { supabase } from '../../lib/supabse';
import type { Post } from '../../schemas/post';

export const adminPostService = {
	async findMany(): Promise<Omit<Post, 'imagesrc'>[]> {
		const { data, error } = await supabase
			.from('posts')
			.select('id, title, date, tags, description, link')
			.order('date', { ascending: false });

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch posts. Please try again later.',
				cause: error,
			});
		}
		if (!data || data.length === 0) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'No posts found. Please try searching again.',
			});
		}
		return data as Omit<Post, 'imagesrc'>[];
	},
};
