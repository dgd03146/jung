import { fontFamily, fontWeights, palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const HOVER_ALPHA = '10';

export const container = recipe({
	base: style({
		display: 'flex',
		alignItems: 'center',
		gap: '0.25rem',
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
		padding: '0.4rem 0.6rem',
		borderRadius: '4px',
		fontFamily: fontFamily.bebas,
		fontWeight: fontWeights.medium,
		fontSize: '0.875rem',
		transition: 'all 0.2s ease',
		cursor: 'pointer',
		border: 'none',
		background: 'transparent',
	}),
	variants: {
		variant: {
			light: {
				color: palette.primary,
				selectors: {
					'&:hover': {
						backgroundColor: `${palette.primary}${HOVER_ALPHA}`,
					},
				},
			},
			dark: {
				color: 'rgba(255, 255, 255, 0.7)',
				selectors: {
					'&:hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
						color: palette.white,
					},
				},
			},
		},
		isActive: {
			true: {},
			false: {
				opacity: 0.6,
			},
		},
	},
	compoundVariants: [
		{
			variants: { variant: 'light', isActive: true },
			style: {
				color: palette.primary,
				fontWeight: fontWeights.semibold,
			},
		},
		{
			variants: { variant: 'dark', isActive: true },
			style: {
				color: palette.white,
				fontWeight: fontWeights.semibold,
			},
		},
	],
	defaultVariants: {
		variant: 'light',
		isActive: false,
	},
});

export const divider = recipe({
	base: style({
		fontSize: '0.75rem',
	}),
	variants: {
		variant: {
			light: {
				color: palette.primary100,
			},
			dark: {
				color: 'rgba(255, 255, 255, 0.3)',
			},
		},
	},
	defaultVariants: {
		variant: 'light',
	},
});
