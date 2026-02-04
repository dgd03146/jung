import { z } from 'zod';

export const CommentUserSchema = z.object({
	id: z.string(),
	email: z.string().email().optional(), // 익명 사용자는 이메일 없음
	full_name: z.string(),
	avatar_url: z.string().url().nullable(),
	is_anonymous: z.boolean().default(false), // 익명 사용자 여부
});

export const CommentSchema = z.object({
	id: z.string(),
	post_id: z.string(),
	user_id: z.string().nullable(), // 익명 댓글은 null
	anonymous_id: z.string().nullable().optional(), // 익명 사용자 ID (anon_xxx)
	anonymous_name: z.string().nullable().optional(), // 익명 사용자 닉네임
	content: z.string(),
	created_at: z.string(),
	updated_at: z.string().nullable(),
	likes: z.number(),
	liked_by: z.array(z.string()).default([]), // userId 또는 anonymousId 저장
	parent_id: z.string().nullable(),
	user: CommentUserSchema,
});

// 익명 댓글 생성 입력 스키마
export const CreateAnonymousCommentInputSchema = z.object({
	postId: z.string().min(1),
	content: z.string().min(1).max(2000),
	anonymousId: z.string().regex(/^anon_/, '익명 ID는 anon_로 시작해야 합니다'),
	nickname: z.string().min(1, '닉네임을 입력해주세요').max(20),
	password: z.string().min(4, '비밀번호는 4자 이상').max(20),
	parentId: z.string().optional(),
});

export type CreateAnonymousCommentInput = z.infer<
	typeof CreateAnonymousCommentInputSchema
>;

// 익명 댓글 수정 입력 스키마
export const UpdateAnonymousCommentInputSchema = z.object({
	commentId: z.string().min(1),
	content: z.string().min(1).max(2000),
	password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type UpdateAnonymousCommentInput = z.infer<
	typeof UpdateAnonymousCommentInputSchema
>;

// 익명 댓글 삭제 입력 스키마
export const DeleteAnonymousCommentInputSchema = z.object({
	commentId: z.string().min(1),
	password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type DeleteAnonymousCommentInput = z.infer<
	typeof DeleteAnonymousCommentInputSchema
>;

export type CommentQueryParams = {
	postId: string;
	parentId?: string;
	limit: number;
	cursor?: string;
	order: 'asc' | 'desc';
};

export type CommentQueryResult = {
	items: Comment[];
	nextCursor: string | null;
	hasNextPage: boolean;
	totalCount: number;
};

export type CommentUser = z.infer<typeof CommentUserSchema>;
export type Comment = z.infer<typeof CommentSchema> & { replies: Comment[] };

export const CreateReplyInputSchema = z.object({
	parentCommentId: z.string().min(1, 'Need parent comment id.'),
	postId: z.string().min(1, 'Need post id.'),
	content: z.string().min(1, 'Need content.'),
});

export type CreateReplyInput = z.infer<typeof CreateReplyInputSchema>;
