import type { Block } from '@blocknote/core';
import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';

// BlockNote 기본 블록 구조
export const EMPTY_CONTENT: Block = {
	id: '1',
	type: 'paragraph',
	props: {
		textColor: 'default',
		backgroundColor: 'default',
		textAlignment: 'left',
	},
	content: [
		{
			type: 'text',
			text: '',
			styles: {},
		},
	],
	children: [],
};

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
