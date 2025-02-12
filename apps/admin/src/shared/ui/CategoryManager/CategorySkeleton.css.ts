import { keyframes } from '@vanilla-extract/css';

export const shimmer = keyframes({
	'0%': {
		backgroundPosition: '-1000px 0',
	},
	'100%': {
		backgroundPosition: '1000px 0',
	},
});
