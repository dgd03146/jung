import { style } from '@vanilla-extract/css';

export const gridLink = style({
	textDecoration: 'none',
	color: 'inherit',
	display: 'block',
	width: '100%',
	perspective: '2000px',
});

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '4/5',

	overflow: 'hidden',
});

export const overlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '25px',
	background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
	transform: 'translateZ(20px)',
	transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
	':hover': {
		transform: 'translateZ(40px)',
	},
});
