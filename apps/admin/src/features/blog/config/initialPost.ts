import type { Block } from '@blocknote/core';
import type { PostData } from '../types/postData';

// BlockNote가 기대하는 기본 블록 구조
export const defaultBlock: Block = {
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

export const initialPostData: PostData = {
	title: '',
	content: [defaultBlock],
	imagesrc: '',
	tags: [],
	category: '',
	description: '',
};
