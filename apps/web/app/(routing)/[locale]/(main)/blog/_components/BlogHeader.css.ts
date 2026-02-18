import { fontFamily, palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const titleLink = style({
	display: 'block',
	textDecoration: 'none',
});

export const titleText = style({
	fontFamily: fontFamily.poppins,
	fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
	fontWeight: '700',
	color: palette.swiss,
	letterSpacing: '-0.02em',
	lineHeight: 1,
	transition: 'opacity 0.2s ease',
	':hover': {
		opacity: 0.6,
	},
});
