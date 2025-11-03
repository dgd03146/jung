import { style } from '@vanilla-extract/css';

export const showListButton = style({
	position: 'absolute',
	bottom: '40px',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '12px 24px',
	backgroundColor: '#0142C0',
	border: 'none',
	borderRadius: '24px',
	boxShadow: '0 4px 12px rgba(1, 66, 192, 0.25)',
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: '600',
	color: '#FFFFFF',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	transition: 'all 0.2s',
	zIndex: 5,

	':hover': {
		transform: 'translateX(-50%) scale(1.05)',
		backgroundColor: '#0039AD',
	},
	':active': {
		transform: 'translateX(-50%) scale(0.95)',
	},

	background: 'linear-gradient(180deg, #0142C0 0%, #0039AD 100%)',
});
