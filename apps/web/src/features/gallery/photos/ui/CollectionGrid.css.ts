import { style } from '@vanilla-extract/css';

export const gridLink = style({
	textDecoration: 'none',
	color: 'inherit',
	display: 'block',
	width: '100%',
	perspective: '1500px',
});

export const motionWrapper = style({
	width: '100%',
	height: '100%',
	transformStyle: 'preserve-3d',
	cursor: 'pointer',
	transition: 'transform 0.2s ease-out',
	':hover': {
		transform: 'translateZ(10px)',
	},
});

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '4/5',
	borderRadius: '12px',
	overflow: 'hidden',
	boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
	background:
		'linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
	border: '1px solid rgba(255,255,255,0.2)',
	transformStyle: 'preserve-3d',
	transition: 'box-shadow 0.3s ease-out',
	':hover': {
		boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
	},
});

export const overlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '20px',
	background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	transform: 'translateZ(20px)',
	transition: 'transform 0.3s ease-out',
	':hover': {
		transform: 'translateZ(30px)',
	},
});
