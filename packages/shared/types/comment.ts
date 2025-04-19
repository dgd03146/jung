import { z } from 'zod';

export const CommentUserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	full_name: z.string(),
	avatar_url: z.string().url().nullable(),
});

export const CommentSchema = z.object({
	id: z.string(),
	post_id: z.string(),
	user_id: z.string(),
	content: z.string(),
	created_at: z.string(),
	updated_at: z.string().nullable(),
	likes: z.number(),
	liked_by: z.array(z.string()).default([]),
	parent_id: z.string().nullable(),
	user: CommentUserSchema,
});

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
