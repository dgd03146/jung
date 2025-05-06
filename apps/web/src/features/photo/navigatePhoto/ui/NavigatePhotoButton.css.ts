import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const modalNavigationWrapper = style({
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

export const modalNavigationButtonsContainer = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	maxWidth: '90vw',
	// padding: '0 40px',

	'@media': {
		'screen and (min-width: 768px)': {
			maxWidth: calc.add('90vw', '40px'),
		},

		'screen and (min-width: 1200px)': {
			maxWidth: calc.add('1000px', '100px'),
		},
	},
});

export const modalNavigationButton = style({
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

	position: 'relative',

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
});

export const navigationIcon = style({
	width: '20px',
	height: '20px',
	opacity: 0.9,
	transition: 'opacity 0.2s ease',

	selectors: {
		[`${modalNavigationButton}:hover &`]: {
			opacity: 1,
		},
	},
});

export const placeholderButton = style({
	width: '28px',
	height: '28px',
	visibility: 'hidden',
});

export const singleButtonContainer = style({
	justifyContent: 'space-between',
});
