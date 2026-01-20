import { createVar, style } from '@vanilla-extract/css';

export const aspectRatioVar = createVar();

export const imageContainer = style({
	overflow: 'hidden',
	cursor: 'pointer',
	aspectRatio: aspectRatioVar,
	contentVisibility: 'auto',
	containIntrinsicSize: '0 300px',
});

export const image = style({
	transition: 'transform 0.2s',

	':hover': {
		transform: 'scale(1.02)',
	},
});

export const overlay = style({
	inset: 0,
	background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
	opacity: 0,
	transition: 'opacity 0.2s',
	alignItems: 'end',
	':hover': {
		opacity: 1,
	},
});

export const title = style({
	opacity: 0,
	transform: 'translateY(10px)',
	transition: 'all 0.2s',
	selectors: {
		[`${overlay}:hover &`]: {
			opacity: 1,
			transform: 'translateY(0)',
		},
	},
});
