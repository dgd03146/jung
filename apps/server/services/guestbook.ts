import type {
	GuestbookMessage,
	GuestbookQueryResult,
} from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabase';

type QueryParams = {
	limit: number;
	cursor?: string;
};

const MAX_CONTENT_LENGTH = 50;

export const guestbookService = {
	async findMany({
		limit,
		cursor,
	}: QueryParams): Promise<GuestbookQueryResult> {
		try {
			let query = supabase.from('guestbook').select('*', { count: 'exact' });

			if (cursor) {
				const { data: cursorMessage } = await supabase
					.from('guestbook')
					.select('created_at')
					.eq('id', cursor)
					.single();

				if (cursorMessage) {
					query = query.lt('created_at', cursorMessage.created_at);
				}
			}

			query = query.order('created_at', { ascending: false });
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

			const lastItem = data[data.length - 1];
			const nextCursor = data.length === limit && lastItem ? lastItem.id : null;

			return {
				items: data,
				nextCursor,
			};
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch messages',
				cause: error,
			});
		}
	},

	async fetchUserInfo(userId: string) {
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.admin.getUserById(userId);

		if (userError || !user) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch user data: ${
					userError?.message || 'User not found'
				}`,
				cause: userError,
			});
		}

		return user;
	},

	async create({
		content,
		backgroundColor,
		emoji,
		userId,
	}: {
		content: string;
		backgroundColor?: string;
		emoji?: string;
		userId: string;
	}): Promise<GuestbookMessage> {
		const trimmedContent = content.trim();
		if (trimmedContent.length === 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Please enter a message.',
			});
		}

		if (trimmedContent.length > MAX_CONTENT_LENGTH) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: `Message cannot exceed ${MAX_CONTENT_LENGTH} characters.`,
			});
		}

		const user = await this.fetchUserInfo(userId);

		const userName = user.user_metadata?.full_name || user.email;
		const userAvatar =
			user.user_metadata?.avatar_url ||
			`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;

		const { data, error } = await supabase
			.from('guestbook')
			.insert({
				content: trimmedContent,
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
