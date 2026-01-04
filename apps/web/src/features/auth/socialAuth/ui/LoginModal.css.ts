import { style } from '@vanilla-extract/css';

export const loginModalContent = style({
	display: 'flex',
	flexDirection: 'column',

	alignItems: 'center',
	gap: '16px',
});

export const closeButton = style({
	alignSelf: 'flex-end',
	padding: '8px',
	background: 'transparent',
	border: 'none',
	cursor: 'pointer',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'background-color 0.2s ease, color 0.2s ease',
	color: '#8E8E93',

	':hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.04)',
		color: '#333333',
	},
	':active': {
		backgroundColor: 'rgba(0, 0, 0, 0.08)',
	},
});
