import { style } from '@vanilla-extract/css';

export const imageContainer = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	maxHeight: '80vh',
	aspectRatio: '4/3',
});

export const navigationWrapper = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 20,
});

export const navigationButtonsContainer = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	maxWidth: '95vw',

	'@media': {
		'screen and (min-width: 1200px)': {
			maxWidth: '1100px',
		},
	},
});

export const navigationButton = style({
	width: '30px',
	height: '30px',
	borderRadius: '50%',
	backgroundColor: 'rgba(255, 255, 255, 0.6)',
	backdropFilter: 'blur(8px)',
	border: 'none',
	boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
	color: '#0142c0',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	pointerEvents: 'auto',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: 'white',
		transform: 'scale(1.08)',
		boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
	},

	':active': {
		transform: 'scale(0.95)',
		boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
	},

	':disabled': {
		opacity: 0.3,
		cursor: 'default',
		transform: 'none',
	},
});

export const navigationIcon = style({
	width: '20px',
	height: '20px',
	opacity: 0.9,
});

export const counter = style({
	position: 'fixed',
	bottom: '20px',
	left: '50%',
	transform: 'translateX(-50%)',
	color: 'white',
	fontSize: '14px',
	fontWeight: '500',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	padding: '6px 14px',
	borderRadius: '20px',
	zIndex: 20,
	pointerEvents: 'none',
});
