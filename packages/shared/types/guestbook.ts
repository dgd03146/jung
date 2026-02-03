import { z } from 'zod';

export const GuestbookMessageSchema = z.object({
	id: z.string().uuid(),
	content: z.string().max(50),
	author_id: z.string().uuid().nullable(), // 익명 메시지는 null
	author_name: z.string().min(1),
	author_avatar: z.string().url(),
	created_at: z.string().datetime(),
	background_color: z.string().optional(),
	emoji: z.string().optional(),
	// 익명 사용자 관련 필드
	anonymous_id: z.string().nullable().optional(),
	is_anonymous: z.boolean().default(false),
});

export const CreateGuestbookMessageSchema = z.object({
	content: z.string().min(1).max(50),
	backgroundColor: GuestbookMessageSchema.shape.background_color,
	emoji: GuestbookMessageSchema.shape.emoji,
});

// 익명 메시지 생성 스키마
export const CreateAnonymousGuestbookMessageSchema = z.object({
	content: z.string().min(1).max(50),
	backgroundColor: z.string().optional(),
	emoji: z.string().optional(),
	anonymousId: z.string().regex(/^anon_/, '익명 ID는 anon_로 시작해야 합니다'),
	nickname: z.string().min(1, '닉네임을 입력해주세요').max(20),
});

export type CreateAnonymousGuestbookMessageInput = z.infer<
	typeof CreateAnonymousGuestbookMessageSchema
>;

export const GuestbookQueryResultSchema = z.object({
	items: z.array(GuestbookMessageSchema),
	nextCursor: z.string().uuid().nullable(),
});

export type GuestbookMessage = z.infer<typeof GuestbookMessageSchema>;
export type GuestbookQueryResult = z.infer<typeof GuestbookQueryResultSchema>;
