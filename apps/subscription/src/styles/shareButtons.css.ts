import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	marginBottom: '1.5rem',
});

export const label = style({
	fontSize: '0.75rem',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	color: 'var(--color-text-muted)',
	marginRight: '0.25rem',
});

export const srOnly = style({
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: 0,
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: 0,
});

export const button = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '36px',
	height: '36px',
	borderRadius: '10px',
	border: '1px solid var(--color-border)',
	background: 'var(--bg-filter)',
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
		color: 'var(--color-primary)',
	},
});

export const kakaoButton = style({
	background: '#FEE500',
	borderColor: 'rgba(0, 0, 0, 0.08)',
	color: '#191919',
	':hover': {
		background: '#FDD835',
		borderColor: 'rgba(0, 0, 0, 0.15)',
		color: '#191919',
		boxShadow: '0 4px 12px rgba(254, 229, 0, 0.3)',
	},
});
