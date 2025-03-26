import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const sectionTitle = style({
	fontFamily: 'var(--font-bebas)',
	display: 'inline-block',
});

export const sectionText = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary200,
	},
});

export const sectionLink = style({
	display: 'flex',
	alignItems: 'center',
});
