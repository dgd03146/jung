import { style } from '@vanilla-extract/css';

const tabBase = style({
	fontFamily: 'var(--font-bebas)',
	fontSize: '1.1rem',
	letterSpacing: '0.04em',
	textDecoration: 'none',
	textTransform: 'uppercase',
	padding: '8px 0',
	borderBottom: '2px solid transparent',
	transition: 'color 0.2s, border-color 0.2s',
});

export const nav = style({
	display: 'flex',
	gap: '20px',
	marginBottom: '16px',
});

export const tab = style([
	tabBase,
	{
		color: '#A8C2F5',
		selectors: {
			'&:hover': {
				color: '#7BA4F0',
			},
		},
	},
]);

export const tabActive = style([
	tabBase,
	{
		color: '#0142C0',
		borderBottom: '2px solid #0142C0',
	},
]);
