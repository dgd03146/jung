import { z } from 'zod';

export const PhotoSchema = z.object({
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
});

export type Photo = z.infer<typeof PhotoSchema>;

export interface CustomPhoto {
	src: string;
	width: number;
	height: number;
	alt: string;
	data: Omit<Photo, 'id' | 'imageUrl' | 'width' | 'height'>;
}
