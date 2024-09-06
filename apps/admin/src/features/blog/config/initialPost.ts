import type { PostData } from '../types/post';

export const initialPostData: PostData = {
	title: '',
	content: [
		{
			type: 'paragraph',
			content: [{ type: 'text', text: '', styles: {} }],
		},
	],
	imagesrc: '',
	tags: [],
};
