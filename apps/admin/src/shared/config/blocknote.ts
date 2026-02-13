import type { Block } from '@blocknote/core';

export const EMPTY_CONTENT: Block = {
	id: 'initial',
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
