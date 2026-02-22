import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const nav = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '24px',
	padding: '16px 0',
	marginBottom: '8px',
});

export const link = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: '13px',
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	color: palette.gray400,
	textDecoration: 'none',
	transition: 'color 0.2s ease',
	selectors: {
		'&:hover': {
			color: palette.primary,
		},
	},
});

export const linkActive = style({
	color: palette.primary,
	fontWeight: 600,
});

export const separator = style({
	color: palette.gray300,
	fontSize: '12px',
	userSelect: 'none',
});
