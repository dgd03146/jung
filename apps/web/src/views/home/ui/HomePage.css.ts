import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style({
	minHeight: calc.subtract('100dvh', '9rem'),
});

export const heading = {
	fontSize: {
		mobile: '7xl',
		tablet: '9xl',
		desktop: '11xl',
	},
	lineHeight: {
		mobile: '14',
		tablet: '18',
		desktop: 'hero',
	},
	fontWeight: 'bold',
	color: 'primary',
	marginBottom: '6',
} as const;

export const subtitle = {
	fontSize: {
		mobile: 'lg',
		tablet: '3xl',
	},
	color: 'primary',
	// marginTop: { mobile: '8', tablet: '12', desktop: '20' },
} as const;
