import { style } from '@vanilla-extract/css';

export const likeButton = style({
	transition: 'transform 0.2s ease',
	':hover': {
		transform: 'scale(1.1)',
	},
	':active': {
		transform: 'scale(0.95)',
	},
});
