import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import {
	border,
	hoverText,
	mutedText,
	shadowMd,
	shadowSm,
	shadowXs,
} from '@/fsd/shared/styles/tokens';

export const header = style({
	padding: '20px 24px',
	borderBottom: `1px solid ${border}`,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const title = style({
	fontSize: '16px',
	fontWeight: '600',
	color: palette.primary,
	letterSpacing: '-0.01em',
});

export const viewToggle = style({
	display: 'flex',
	gap: '4px',
	padding: '2px',
	background: border,
	borderRadius: '8px',
});

export const viewToggleButton = style({
	padding: '6px 12px',
	border: 'none',
	borderRadius: '6px',
	fontSize: '13px',
	fontWeight: '500',
	color: mutedText,
	background: 'transparent',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		color: hoverText,
	},

	selectors: {
		'&[data-active="true"]': {
			background: 'white',
			color: palette.primary,
			boxShadow: shadowXs,
		},
	},
});

export const addButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '0 20px',
	height: '40px',
	background: palette.primary,
	color: 'white',
	border: 'none',
	borderRadius: '10px',
	fontSize: '14px',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	boxShadow: shadowSm,

	':hover': {
		background: palette.primary200,
		transform: 'translateY(-1px)',
		boxShadow: shadowMd,
	},
});

export const borderBottom = style({
	borderWidth: 0,
	borderBottomWidth: '1px',
});
