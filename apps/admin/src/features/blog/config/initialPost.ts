import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';
import type { Block } from '@blocknote/core';

// BlockNote 기본 블록 구조
export const EmptyContent: Block = {
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

export const EmptyPost: PostWithBlockContent = {
	id: '',
	date: '',
	title: '',
	content: [EmptyContent],
	imagesrc: '',
	tags: [],
	category: '',
	description: '',
};
