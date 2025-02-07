import { style } from '@vanilla-extract/css';

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

export const navigationIcon = style({
	width: '24px',
	height: '24px',
	opacity: 1,
	transition: 'transform 0.2s ease',

	':hover': {
		transform: 'scale(1.1)',
	},
});
