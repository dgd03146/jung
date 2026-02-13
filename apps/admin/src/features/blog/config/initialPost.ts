import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';
import { EMPTY_CONTENT } from '@/fsd/shared/config/blocknote';

export { EMPTY_CONTENT };

export const EMPTY_POST: PostWithBlockContent = {
	id: '',
	date: '',
	title: '',
	content: [EMPTY_CONTENT],
	imagesrc: '',
	tags: [],
	category_id: '',
	description: '',
};
