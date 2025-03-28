import { style } from '@vanilla-extract/css';

export const container = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 10,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	pointerEvents: 'none',
});

export const overlay = style({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.85)',
	backdropFilter: 'blur(2px)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	pointerEvents: 'auto',
	zIndex: 1,
});

export const shareOverlay = style([
	overlay,
	{
		zIndex: 20,
	},
]);

export const photoContent = style({
	position: 'relative',
	maxWidth: '95vw',
	width: '100%',
	height: 'auto',
	maxHeight: '90dvh',
	overflow: 'hidden',
	pointerEvents: 'auto',

	backgroundColor: 'transparent',

	'@media': {
		'screen and (min-width: 1200px)': {
			maxWidth: '1100px',
		},
	},
});

export const shareContent = style({
	position: 'relative',
	maxWidth: '400px',
	width: '90%',
	margin: '0 auto',
	backgroundColor: 'white',
	borderRadius: '12px',
	overflow: 'hidden',
	pointerEvents: 'auto',
	padding: '20px',
	boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
});

export const closeButton = style({
	position: 'fixed',
	top: '20px',
	right: '20px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '40px',
	height: '40px',
	padding: 0,
	border: 'none',
	borderRadius: '50%',
	backgroundColor: 'transparent',
	color: 'white',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	pointerEvents: 'auto',
	zIndex: 15,

	':hover': {
		transform: 'scale(1.1)',
	},

	'@media': {
		'(max-width: 768px)': {
			top: '10px',
			right: '10px',
			width: '32px',
			height: '32px',
		},
	},
});
