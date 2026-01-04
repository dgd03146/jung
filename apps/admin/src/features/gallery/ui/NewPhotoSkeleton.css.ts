import { style } from '@vanilla-extract/css';

export const skeletonContainer = style({
	gridTemplateColumns: 'minmax(0px, 1fr)',
	'@media': {
		'(max-width: 768px)': {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
	},
});
