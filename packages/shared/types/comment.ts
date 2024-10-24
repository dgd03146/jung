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
	likes: z.number(),
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
};

export type CommentUser = z.infer<typeof CommentUserSchema>;
export type Comment = z.infer<typeof CommentSchema> & { replies: Comment[] };
