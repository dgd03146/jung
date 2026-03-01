import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const NAV_GAP = '20px';
const NAV_MARGIN_BOTTOM = '16px';
const TAB_PADDING = '8px 0';
const TAB_BORDER_WIDTH = '2px';
const TAB_TRANSITION = 'color 0.2s, border-color 0.2s';

const tabBase = style({
	fontFamily: 'var(--font-bebas)',
	fontSize: '0.85rem',
	letterSpacing: '0.04em',
	textDecoration: 'none',
	textTransform: 'uppercase',
	padding: TAB_PADDING,
	borderBottom: `${TAB_BORDER_WIDTH} solid transparent`,
	transition: TAB_TRANSITION,
});

export const nav = style({
	display: 'flex',
	gap: NAV_GAP,
	marginBottom: NAV_MARGIN_BOTTOM,
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
		borderBottom: `${TAB_BORDER_WIDTH} solid ${palette.primary}`,
	},
]);
