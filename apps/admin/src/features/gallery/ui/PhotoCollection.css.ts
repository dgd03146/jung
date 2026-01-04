import { style } from '@vanilla-extract/css';

export const collectionGrid = style({
	gridTemplateColumns: 'minmax(0px, 1fr)',
	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
		},
		'(min-width: 1024px)': {
			gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
		},
	},
});

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

export const collectionCardImage = style({
	objectFit: 'cover',
});

export const actionsContainer = style({
	borderTopWidth: '1px',
});

export const actions = style({
	opacity: 0,
	top: 10,
	right: 10,

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

export const titleContainer = style({
	borderBottomWidth: '1px',
});

export const previewImageContainer = style({
	height: '240px',
});

export const previewImage = style({
	objectFit: 'cover',
});
