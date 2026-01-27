import { style } from '@vanilla-extract/css';

export const container = style({
	maxWidth: '720px',
	margin: '0 auto',

	'@media': {
		'(min-width: 1024px)': {
			maxWidth: '100%',
		},
	},
});
