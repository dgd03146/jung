import { style } from '@vanilla-extract/css';

export const collectionCard = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	overflow: 'hidden',
	transition: 'all 0.2s ease',

	':hover': {
		transform: 'translateY(-4px)',
		boxShadow: '0 12px 24px -8px rgba(1, 66, 192, 0.15)',
	},
});

export const actions = style({
	opacity: 0,

	selectors: {
		[`${collectionCard}:hover &`]: {
			opacity: 1,
		},
	},
});

export const modalOverlay = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0, 0, 0, 0.5)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	// padding: '24px',
	zIndex: 1000,
});

export const modalContent = style({
	background: 'white',
	borderRadius: '16px',
	padding: '24px',
	width: '100%',
	maxWidth: '500px',

	overflow: 'auto',
	position: 'relative',
});
