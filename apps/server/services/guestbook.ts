import type {
	GuestbookMessage,
	GuestbookQueryResult,
} from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabase';

type QueryParams = {
	limit: number;
	cursor?: number;
};

export const guestbookService = {
	async findMany({
		limit,
		cursor,
	}: QueryParams): Promise<GuestbookQueryResult> {
		let query = supabase.from('guestbook').select('*', { count: 'exact' });

		query = query.order('created_at', { ascending: false });

		if (cursor) {
			query = query.gt('id', cursor);
		}
		query = query.limit(limit);

		const { data, error } = await query.returns<GuestbookMessage[]>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch messages. Please try again later.',
				cause: error,
			});
		}

		if (!data || data.length === 0) {
			return {
				items: [],
				nextCursor: null,
			};
		}

		const nextCursor = Number(data[data.length - 1]?.id) ?? null;

		return {
			items: data,
			nextCursor,
		};
	},

	async create({
		content,
		userId,
		userName,
		userAvatar,
		backgroundColor,
		emoji,
	}: {
		content: string;
		userId: string;
		userName: string;
		userAvatar: string;
		backgroundColor?: string;
		emoji?: string;
	}): Promise<GuestbookMessage> {
		const { data, error } = await supabase
			.from('guestbook')
			.insert({
				content,
				author_id: userId,
				author_name: userName,
				author_avatar: userAvatar,
				background_color: backgroundColor,
				emoji,
			})
			.select()
			.single<GuestbookMessage>();

		if (error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Failed to create message. Please try again later.',
				cause: error,
			});
		}

		return data;
	},
};
