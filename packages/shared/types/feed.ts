import { z } from 'zod';

export const FeedSchema = z.object({
	id: z.number(),
	imageUrl: z.string().url(),
	width: z.number().positive(),
	height: z.number().positive(),
	alt: z.string(),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	createdAt: z.string(),
	likes: z.number().default(0),
	views: z.number().default(0),
	author: z.object({
		id: z.number(),
		name: z.string(),
		avatar: z.string().url().optional(),
	}),
});

export type Feed = z.infer<typeof FeedSchema>;

export interface CustomFeed {
	src: string;
	width: number;
	height: number;
	alt: string;
	data: Omit<Feed, 'id' | 'imageUrl' | 'width' | 'height'>;
}
