import {
	fontFamily,
	fontSizes,
	fontWeights,
	palette,
} from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
	base: style({
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
	}),
	variants: {
		variant: {
			light: {},
			dark: {},
		},
	},
	defaultVariants: {
		variant: 'light',
	},
});

export const button = recipe({
	base: style({
		padding: '0.25rem 0',
		fontFamily: fontFamily.poppins,
		fontWeight: fontWeights.medium,
		fontSize: fontSizes.xxxs,
		letterSpacing: '0.08em',
		transition: 'opacity 0.2s ease',
		cursor: 'pointer',
		border: 'none',
		background: 'transparent',
		opacity: 0.35,
	}),
	variants: {
		variant: {
			light: {
				color: palette.primary,
			},
			dark: {
				color: palette.white,
			},
		},
		isActive: {
			true: {
				opacity: 1,
				fontWeight: fontWeights.semibold,
			},
			false: {},
		},
	},
	defaultVariants: {
		variant: 'light',
		isActive: false,
	},
});

export const divider = recipe({
	base: style({
		display: 'none',
	}),
	variants: {
		variant: {
			light: {},
			dark: {},
		},
	},
	defaultVariants: {
		variant: 'light',
	},
});
