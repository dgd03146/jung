import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const fadeOut = keyframes({
	'0%': { opacity: 1 },
	'100%': { opacity: 0 },
});

const scaleIn = keyframes({
	'0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.95)' },
	'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	zIndex: 9998,
	animation: `${fadeIn} 150ms ease-out`,
	selectors: {
		'&[data-closing="true"]': {
			animation: `${fadeOut} 150ms ease-in forwards`,
		},
	},
});

export const content = style({
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: '#fff',
	borderRadius: '12px',
	boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
	padding: '24px',
	width: '90vw',
	maxWidth: '420px',
	zIndex: 9999,
	animation: `${scaleIn} 150ms ease-out`,
	outline: 'none',
	selectors: {
		'&[data-closing="true"]': {
			animation: `${fadeOut} 150ms ease-in forwards`,
		},
	},
});

export const title = style({
	fontSize: '18px',
	fontWeight: 600,
	color: '#1a1a1a',
	margin: 0,
	lineHeight: 1.4,
});

export const description = style({
	fontSize: '14px',
	color: '#666',
	margin: 0,
	marginTop: '8px',
	lineHeight: 1.5,
});

export const actions = style({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '8px',
	marginTop: '24px',
});
