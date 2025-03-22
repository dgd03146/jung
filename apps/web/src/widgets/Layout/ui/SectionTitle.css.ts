import { sprinkles } from '@jung/design-system/styles';
import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const sectionTitle = style([
	sprinkles({
		color: 'primary',
	}),
	{
		fontFamily: 'var(--font-bebas)',
	},
]);

export const sectionText = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary200,
	},
});
