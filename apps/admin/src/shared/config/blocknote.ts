import type { Block } from '@blocknote/core';

const PLACEHOLDER_BLOCK_ID = 'initial';

export const EMPTY_CONTENT: Block = {
	id: PLACEHOLDER_BLOCK_ID,
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
