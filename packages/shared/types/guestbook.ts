import { z } from 'zod';

export const GuestbookMessageSchema = z.object({
	id: z.string().uuid(),
	content: z.string().max(50),
	author_id: z.string().uuid(),
	author_name: z.string().min(1),
	author_avatar: z.string().url(),
	created_at: z.string().datetime(),
	background_color: z.string().optional(),
	emoji: z.string().optional(),
});

export const CreateGuestbookMessageSchema = z.object({
	content: z.string().min(1).max(50),
	backgroundColor: GuestbookMessageSchema.shape.background_color,
	emoji: GuestbookMessageSchema.shape.emoji,
});

export const GuestbookQueryResultSchema = z.object({
	items: z.array(GuestbookMessageSchema),
	nextCursor: z.string().uuid().nullable(),
});

export type GuestbookMessage = z.infer<typeof GuestbookMessageSchema>;
export type GuestbookQueryResult = z.infer<typeof GuestbookQueryResultSchema>;
