import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles';

export const wrapper = style({
	width: 'fit-content',
	position: 'relative',
});

export const tooltip = recipe({
	base: [
		sprinkles({
			display: 'flex',

			alignItems: 'center',
			columnGap: '2',
			position: 'absolute',
			color: 'white',
			borderRadius: 'sm',
		}),
		{
			zIndex: 9999,
			transitionProperty: 'opacity',
			transitionDuration: '200ms',
			transitionDelay: '100ms',
			transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
		},
	],
	variants: {
		isVisible: {
			true: {
				opacity: 1,
				visibility: 'visible',
			},
			false: {
				opacity: 0,
				visibility: 'hidden',
			},
		},
		variant: {
			primary: sprinkles({ background: 'primary' }),
			secondary: sprinkles({ background: 'primary200' }),
		},
		size: {
			sm: sprinkles({
				paddingX: '3',
				paddingY: '1',
			}),
			md: sprinkles({
				paddingX: '4',
				paddingY: '2',
			}),
		},
	},

	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
});

export const tooltipArrow = recipe({
	base: [
		sprinkles({
			position: 'absolute',
			fontSize: '2xl',
		}),
		{
			zIndex: 9999,
			transitionProperty: 'opacity',
			transitionDuration: '200ms',
			transitionDelay: '100ms',
			transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
		},
	],
	variants: {
		isVisible: {
			true: {
				opacity: 1,
				visibility: 'visible',
			},
			false: {
				opacity: 0,
				visibility: 'hidden',
			},
		},
		variant: {
			primary: sprinkles({ color: 'primary' }),
			secondary: sprinkles({ color: 'primary200' }),
		},
	},

	defaultVariants: {
		variant: 'primary',
	},
});

export const closeButton = recipe({
	base: [],
	variants: {
		variant: {
			primary: sprinkles({ color: 'white' }),
			secondary: sprinkles({ color: 'white' }),
		},
	},
});
