import { sprinkles } from '@jung/design-system/styles';
import { globalStyle, style } from '@vanilla-extract/css';

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
	overflow: 'hidden',
	margin: '0 auto',
	maxWidth: '1200px',
	width: '100%',
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
});

export const modalContent = style({
	'@media': {
		'(min-width: 1024px)': {
			padding: '24px',
		},
	},
});

export const actionButton = style({
	':hover': {
		transform: 'scale(1.1)',
		backgroundColor: 'transparent',
	},
	':active': {
		transform: 'scale(0.95)',
	},
});

export const navigationWrapper = style({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
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
});

export const navigationButtonsContainer = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	maxWidth: 'calc(1024px + 400px)',
	padding: '0 120px',
});

export const modalNavigationButtonsContainer = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	maxWidth: 'calc(1024px + 120px)',
	padding: '0 40px',
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

export const modalNavigationButton = style([
	navigationButton,
	{
		width: '28px',
		height: '28px',
		backgroundColor: '#F5FBFF',
		backdropFilter: 'blur(8px)',
		pointerEvents: 'auto',
	},
]);

export const modalNavigationIcon = style([
	navigationIcon,
	{
		width: '16px',
		height: '16px',
	},
]);

export const backLinkWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		marginLeft: '1',
	}),
]);

export const backLink = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		background: 'transparent',
		color: {
			base: 'primary200',
			hover: 'primary',
		},
		gap: '2',
		transition: 'fast',
	}),
	{
		':hover': {
			transform: 'translateX(-2px)',
		},
	},
]);

globalStyle(`${backLink}:hover svg`, {
	transform: 'translateX(-2px)',
});

globalStyle(`${backLink} span`, {
	'@media': {
		'(max-width: 768px)': {
			display: 'none',
		},
	},
});
