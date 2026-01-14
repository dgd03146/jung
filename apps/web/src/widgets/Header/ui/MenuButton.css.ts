import { palette } from '@jung/design-system/tokens';
import { recipe } from '@vanilla-extract/recipes';

export const menuButtonText = recipe({
	base: {
		transition: 'color 0.3s ease-in-out',
		fontFamily: 'var(--font-bebas)',
	},
	variants: {
		isMenuOpen: {
			true: {},
			false: {},
		},
		variant: {
			light: {
				color: palette.primary,
				':hover': {
					color: palette.primary200,
				},
			},
			dark: {
				color: palette.white,
				':hover': {
					color: 'rgba(255, 255, 255, 0.7)',
				},
			},
		},
	},
	compoundVariants: [
		{
			variants: { isMenuOpen: true },
			style: {
				color: palette.white,
				':hover': {
					color: 'rgba(255, 255, 255, 0.7)',
				},
			},
		},
	],
	defaultVariants: {
		variant: 'light',
		isMenuOpen: false,
	},
});
