import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const footer = style({
	height: '72px',
	maxWidth: '92%',
});

export const socialIconText = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary200,
	},
});

export const footerText = style({
	fontFamily: 'var(--font-bebas)',
});
