import { style } from '@vanilla-extract/css';

export const container = style({
	position: 'relative',
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
	margin: '0 auto',
	zIndex: 60,
});

export const navigationButtonsContainer = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	maxWidth: 'calc(1024px + 400px)',
	padding: '0 120px',
	position: 'absolute',
	pointerEvents: 'none',
});

export const navigationButton = style({
	width: '40px',
	height: '40px',
	borderRadius: '8px',
	backgroundColor: '#F5FBFF',
	backdropFilter: 'blur(10px)',
	border: '1px solid rgba(1, 66, 192, 0.1)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	pointerEvents: 'auto',
	boxShadow: '0 2px 6px rgba(1, 66, 192, 0.08)',
	color: '#0142C0',
	transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
	position: 'relative',
	zIndex: 61,

	':hover': {
		backgroundColor: '#0142C0',
		color: 'white',
		transform: 'translateY(-2px)',
		boxShadow: '0 4px 12px rgba(1, 66, 192, 0.15)',
		border: '1px solid #0142C0',
	},

	':active': {
		backgroundColor: '#002766',
		transform: 'translateY(0)',
		boxShadow: '0 2px 4px rgba(1, 66, 192, 0.1)',
		border: '1px solid #002766',
	},
});

export const navigationIcon = style({
	width: '24px',
	height: '24px',
	opacity: 1,
	transition: 'transform 0.2s ease',

	selectors: {
		[`${navigationButton}:hover &`]: {
			transform: 'scale(1.1)',
		},
	},
});

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
	zIndex: 60,
});

export const modalNavigationButton = style([
	navigationButton,
	{
		width: '28px',
		height: '28px',
	},
]);

export const modalNavigationIcon = style([
	navigationIcon,
	{
		width: '16px',
		height: '16px',
	},
]);

export const modalNavigationButtonsContainer = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	maxWidth: 'calc(1024px + 80px)',
	padding: '0 20px',
	position: 'absolute',
	pointerEvents: 'none',
});
