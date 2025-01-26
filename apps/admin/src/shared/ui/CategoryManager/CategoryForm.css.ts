import { style } from '@vanilla-extract/css';

export const colorInput = style({
	width: '100%',
	height: '40px',
	padding: '4px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	cursor: 'pointer',
	background: 'white',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#cbd5e1',
	},

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const input = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#1e293b',
	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
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
	padding: '24px',
	zIndex: 1000,
});

export const modalContent = style({
	background: 'white',
	borderRadius: '16px',
	padding: '24px',
	width: '100%',
	maxWidth: '500px',
	maxHeight: 'calc(100dvh - 48px)',
	overflow: 'auto',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
});
