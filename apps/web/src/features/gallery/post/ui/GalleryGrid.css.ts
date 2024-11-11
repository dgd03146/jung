import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

export const container = style({
	width: '100%',
	maxWidth: '100vw',
	margin: '0 auto',
});

export const photoWrapper = style({
	position: 'relative',
	width: '100%',
	cursor: 'pointer',
	overflow: 'hidden',
	borderRadius: '8px',
	backgroundColor: '#f5f5f5',
	transition: 'all 0.3s ease',

	':hover': {
		transform: 'translateY(-4px)',
		boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
	},
});

export const overlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '20px',
	background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
	opacity: 0,
	transition: 'opacity 0.3s ease',

	selectors: {
		[`${photoWrapper}:hover &`]: {
			opacity: 1,
		},
	},
});

export const modal = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0,0,0,0.9)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1000,
	animation: `${fadeIn} 0.3s ease`,
});

export const modalContent = style({
	maxWidth: '90vw',
	maxHeight: '90vh',
	background: 'white',
	borderRadius: '8px',
	overflow: 'hidden',
});

export const modalImage = style({
	width: '100%',
	height: 'auto',
	objectFit: 'contain',
});

export const modalInfo = style({
	padding: '20px',
	background: 'white',
});
