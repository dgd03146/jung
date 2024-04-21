import { keyframes, style } from '@vanilla-extract/css';

const rotateAnimation = keyframes({
	'0%': {
		strokeDashoffset: 44,
	},
	'100%': {
		strokeDashoffset: 220,
	},
});

export const circle = style({
	animation: `${rotateAnimation} 2s linear 1ms infinite`,
	strokeDasharray: '100,76',
	strokeDashoffset: 44,
	strokeLinecap: 'round',
});
