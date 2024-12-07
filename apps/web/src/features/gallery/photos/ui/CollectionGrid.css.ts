import { style } from '@vanilla-extract/css';

export const gridLink = style({
	textDecoration: 'none',
	color: 'inherit',
	display: 'block',
	width: '100%',
	perspective: '2000px',
});

export const motionWrapper = style({
	width: '100%',
	height: '100%',
	transformStyle: 'preserve-3d',
	cursor: 'pointer',
	transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
	':hover': {
		transform: 'translateZ(20px)',
	},
});

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '4/5',
	borderRadius: '16px',
	overflow: 'hidden',
	boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
	background:
		'linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
	border: '1px solid rgba(255,255,255,0.2)',
	transformStyle: 'preserve-3d',
	transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
	':hover': {
		boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
		transform: 'scale(1.02)',
	},
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
