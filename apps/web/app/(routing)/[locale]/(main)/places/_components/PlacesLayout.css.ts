import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const controlBar = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: '8px',
});

export const mapToggleButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '32px',
	height: '32px',
	borderRadius: '100px',
	border: `1.5px solid ${palette.primary100}`,
	backgroundColor: palette.primary50,
	color: palette.primary200,
	cursor: 'pointer',
	transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
	flexShrink: 0,
	selectors: {
		'&:hover': {
			borderColor: palette.primary200,
			backgroundColor: palette.primary100,
			color: palette.primary,
		},
	},
});

export const mapToggleButtonActive = style({
	backgroundColor: palette.primary,
	borderColor: palette.primary,
	color: palette.white,
	selectors: {
		'&:hover': {
			backgroundColor: palette.primary200,
			borderColor: palette.primary200,
		},
	},
});
