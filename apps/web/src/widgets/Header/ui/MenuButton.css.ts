import { palette } from '@jung/design-system/tokens';
import { recipe } from '@vanilla-extract/recipes';

export const menuButtonText = recipe({
	base: {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary,
		fontFamily: 'var(--font-bebas)',

		':hover': {
			color: palette.primary200,
		},
	},
	variants: {
		isMenuOpen: {
			true: {
				color: palette.white,
			},
			false: {
				color: palette.primary,
			},
		},
	},
});
