import { keyframes, style } from '@vanilla-extract/css';

const sparkleAnimation = keyframes({
	'0%': { opacity: 1, transform: 'rotate(-5deg) scale(1)' },
	'50%': { opacity: 0.7, transform: 'rotate(5deg) scale(0.95)' },
	'100%': { opacity: 1, transform: 'rotate(-5deg) scale(1)' },
});

export const emptyStateContainer = style({
	width: '100%',
	minHeight: '400px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#FAFAFA',
	borderRadius: '24px',
	padding: '2rem',
	margin: '2rem 0',
	border: '1px dashed #E0E0E0',
});

export const emptyStateContent = style({
	textAlign: 'center',
	padding: '2rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const emptyStateEmoji = style({
	fontSize: '3.5rem',
	marginBottom: '1.5rem',
	display: 'inline-block',
	filter: 'saturate(1.2)',
	transform: 'rotate(-5deg)',
	animation: `${sparkleAnimation} 2s infinite`,
});
