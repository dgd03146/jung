import { z } from 'zod';

export const PostSchema = z.object({
	id: z.string().uuid(),
	imagesrc: z.string().url(),
	category: z.string(),
	content: z.any(),
	date: z.string(),
	tags: z.array(z.string()),
	title: z.string(),
	description: z.string(),
	category_id: z.string().optional(),
	likes: z.number(),
	liked_by: z.array(z.string()),
});

export type Post = z.infer<typeof PostSchema>;

export type PostPreview = Pick<Post, 'id' | 'title'>;

export type AdjacentPosts = {
	previous: PostPreview | null;
	next: PostPreview | null;
};
