import { style } from '@vanilla-extract/css';

export const collectionListGrid = style({
	display: 'grid',
	gridTemplateColumns: 'minmax(0px, 1fr)',
	gap: '24px',

	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
		'(min-width: 1024px)': {
			gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
		},
	},
});
