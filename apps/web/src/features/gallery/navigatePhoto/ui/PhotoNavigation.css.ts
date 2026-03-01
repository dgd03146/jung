import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const SPACING = {
	NAV_GAP: '24px',
	NAV_PADDING: '16px 0',
	NAV_MARGIN_BOTTOM: '8px',
} as const;

const TYPOGRAPHY = {
	LINK_FONT_SIZE: '13px',
	LINK_LETTER_SPACING: '0.1em',
	LINK_TRANSITION: 'color 0.2s ease',
	SEPARATOR_FONT_SIZE: '12px',
} as const;

const WEIGHTS = {
	LINK_ACTIVE: 600,
} as const;

export const nav = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: SPACING.NAV_GAP,
	padding: SPACING.NAV_PADDING,
	marginBottom: SPACING.NAV_MARGIN_BOTTOM,
});

export const link = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: TYPOGRAPHY.LINK_FONT_SIZE,
	letterSpacing: TYPOGRAPHY.LINK_LETTER_SPACING,
	textTransform: 'uppercase',
	color: palette.gray400,
	textDecoration: 'none',
	transition: TYPOGRAPHY.LINK_TRANSITION,
	selectors: {
		'&:hover': {
			color: palette.primary,
		},
	},
});

export const linkActive = style({
	color: palette.primary,
	fontWeight: WEIGHTS.LINK_ACTIVE,
});

export const separator = style({
	color: palette.gray300,
	fontSize: TYPOGRAPHY.SEPARATOR_FONT_SIZE,
	userSelect: 'none',
});
