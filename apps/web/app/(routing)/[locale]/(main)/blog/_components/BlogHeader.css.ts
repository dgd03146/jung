import { fontFamily, palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const titleLink = style({
	display: 'block',
	textDecoration: 'none',
});

export const titleText = style({
	fontFamily: fontFamily.bebas,
	fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
	fontWeight: 'normal',
	color: palette.swiss,
	letterSpacing: '0.04em',
	lineHeight: 1,
	transition: 'opacity 0.2s ease',
	':hover': {
		opacity: 0.6,
	},
});
