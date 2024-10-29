import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	marginTop: '32px',
	paddingTop: '24px',
	// borderTop: `1px solid ${palette.gray100}`,
});

export const navigationWrapper = style({
	width: '100%',
	marginBottom: '24px',
});

export const link = style({
	flex: 1,
	textDecoration: 'none',
	color: 'inherit',
});

export const navItem = style({
	padding: '16px',
	borderRadius: '12px',
	// border: `1px solid ${palette.gray100}`,
	background: palette.white,
	transition: 'all 0.2s ease-in-out',

	':hover': {
		borderColor: palette.primary,
		background: palette.primary50,
	},
});

export const icon = style({
	color: palette.primary,
});

export const title = style({
	display: '-webkit-box',
	WebkitLineClamp: 1,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	lineHeight: '1.4',
	fontSize: '14px',
	fontWeight: '500',
	color: palette.primary300,
	textAlign: 'left',
});

export const backLink = style({
	textDecoration: 'none',
	color: palette.primary,
	padding: '16px 0',

	':hover': {
		color: palette.primary200,
	},
});
