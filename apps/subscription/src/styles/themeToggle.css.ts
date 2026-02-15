import { style } from '@vanilla-extract/css';

export const toggle = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '36px',
	height: '36px',
	borderRadius: '10px',
	border: '1px solid var(--color-border)',
	background: 'var(--bg-card)',
	backdropFilter: 'blur(10px)',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	color: 'var(--color-text-muted)',
	padding: 0,
	':hover': {
		background: 'var(--bg-card-hover)',
		borderColor: 'var(--color-border-hover)',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 12px var(--shadow-color)',
	},
});
