import type { PostData } from './postData';

export type Errors = Record<
	keyof Pick<PostData, 'imagesrc' | 'title' | 'description' | 'category'>,
	string
>;
