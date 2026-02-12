import { keyframes, style } from '@vanilla-extract/css';

const slideUp = keyframes({
	'0%': { opacity: 0, transform: 'translateX(-50%) translateY(100%)' },
	'100%': { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
});

export const container = style({
	position: 'fixed',
	bottom: '24px',
	left: '50%',
	transform: 'translateX(-50%)',
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	padding: '12px 20px',
	backgroundColor: '#1a1a1a',
	color: '#fff',
	borderRadius: '12px',
	boxShadow: '0 8px 32px rgba(0, 0, 0, 0.24)',
	zIndex: 1000,
	animation: `${slideUp} 200ms ease-out`,
	fontSize: '14px',
});

export const count = style({
	fontWeight: 600,
	whiteSpace: 'nowrap',
});

export const divider = style({
	width: '1px',
	height: '20px',
	backgroundColor: 'rgba(255, 255, 255, 0.2)',
});

export const clearButton = style({
	background: 'none',
	border: 'none',
	color: 'rgba(255, 255, 255, 0.6)',
	cursor: 'pointer',
	padding: '4px 8px',
	borderRadius: '6px',
	fontSize: '13px',
	whiteSpace: 'nowrap',
	transition: 'color 150ms',
	':hover': {
		color: '#fff',
	},
});
