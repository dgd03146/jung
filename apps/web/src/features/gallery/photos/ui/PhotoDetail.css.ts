import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	maxInlineSize: '1024px',
	backgroundColor: 'white',
	blockSize: 'auto',
	minBlockSize: '600px',
	margin: '0 auto',
	marginBlock: '2rem',
});

export const modalContainer = style({
	borderRadius: '12px',
	overflow: 'hidden',
	margin: '0',
	'@media': {
		'(min-width: 1024px)': {
			flexDirection: 'row',
			blockSize: '600px',
		},
	},
});

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '4/3',
	minBlockSize: '450px',
	backgroundColor: 'black',
	'@media': {
		'(min-width: 1024px)': {
			inlineSize: '100%',
			blockSize: 'auto',
			aspectRatio: '16/9',
		},
	},
});

export const modalImageWrapper = style({
	'@media': {
		'(min-width: 1024px)': {
			inlineSize: '60%',
			blockSize: '100%',
			aspectRatio: 'auto',
		},
	},
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '40px',
	padding: '24px 0',
	flex: 1,
	'@media': {
		'(min-width: 768px)': {
			paddingInline: '16px',
		},
	},
});

export const modalContent = style({
	'@media': {
		'(min-width: 1024px)': {
			padding: '24px',
		},
	},
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
});

export const description = style({
	color: '#4B5563',
});

export const interactionSection = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '16px 0',
	borderTop: '1px solid #E5E7EB',
	// borderBottom: '1px solid #E5E7EB',
});

export const stats = style({
	display: 'flex',
	gap: '16px',
	color: '#6B7280',
});

export const actionButton = style({
	color: '#0142C0',
	padding: '8px',
	transition: 'all 0.2s ease',
	':hover': {
		transform: 'scale(1.1)',
		backgroundColor: 'transparent',
	},
	':active': {
		transform: 'scale(0.95)',
	},
});

export const navigationButton = style({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	background: 'transparent',
	border: 'none',
	padding: '24px 16px',
	cursor: 'pointer',
	color: '#fff',
	opacity: 0,
	transition: 'opacity 0.2s ease',
	zIndex: 10,

	':hover': {
		opacity: 1,
	},

	'@media': {
		'(max-width: 768px)': {
			display: 'none',
		},
	},
});

export const prevButton = style({
	left: 0,
});

export const nextButton = style({
	right: 0,
});

export const navigationOverlay = style({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background:
		'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(0,0,0,0.2) 100%)',
	opacity: 0,
	transition: 'opacity 0.3s ease',
	pointerEvents: 'none',

	selectors: {
		[`${imageWrapper}:hover &`]: {
			opacity: 1,
		},
	},
});
