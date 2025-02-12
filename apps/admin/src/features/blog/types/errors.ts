import type { Post } from '@/fsd/entities';

export type Errors = Record<
	keyof Pick<Post, 'imagesrc' | 'title' | 'description' | 'category' | 'date'>,
	string
>;
