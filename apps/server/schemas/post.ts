import { z } from 'zod';

export const PostSchema = z.object({
	id: z.string().uuid(),
	imagesrc: z.string().url(),
	date: z.string(),
	tags: z.array(z.string()),
	title: z.string(),
	description: z.string(),
	link: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
// FIXME: Shared workspace로 공용 타입
