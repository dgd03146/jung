import { style } from '@vanilla-extract/css';

export const headerSection = style({
	position: 'relative',
	height: '300px',
	marginBottom: '2rem',
	borderRadius: '1rem',
	overflow: 'hidden',
});

export const gradientOverlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '1.5rem',
	background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
});

export const imageContainer = style({
	overflow: 'hidden',
	borderRadius: '0.5rem',
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
