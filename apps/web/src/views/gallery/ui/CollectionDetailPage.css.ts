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
