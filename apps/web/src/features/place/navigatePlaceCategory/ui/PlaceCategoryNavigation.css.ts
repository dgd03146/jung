import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const tabBase = style({
	fontFamily: 'var(--font-bebas)',
	fontSize: '0.875rem',
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
		color: palette.primary100,
		selectors: {
			'&:hover': {
				color: palette.primary200,
			},
		},
	},
]);

export const tabActive = style([
	tabBase,
	{
		color: palette.primary,
		borderBottom: `2px solid ${palette.primary}`,
	},
]);
