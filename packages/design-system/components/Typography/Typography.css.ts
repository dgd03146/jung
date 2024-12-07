import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles';

/**
 * Typography Heading
 */
export const heading = recipe({
	base: [
		sprinkles({
			fontWeight: 'semibold',
		}),
	],
	variants: {
		level: {
			1: sprinkles({
				fontSize: '5xl',
				lineHeight: '14',
			}),
			2: sprinkles({
				fontSize: '4xl',
				lineHeight: '10',
			}),
			3: sprinkles({
				fontSize: '3xl',
				lineHeight: '8',
			}),
			4: sprinkles({
				fontSize: '2xl',
				lineHeight: '7',
			}),
		},
	},
	compoundVariants: [
		{
			variants: {
				level: 1,
			},
			style: sprinkles({
				fontWeight: 'bold',
			}),
		},
	],
});

/**
 * Typography Text
 */
export const text = recipe({
	base: sprinkles({}),
	variants: {
		level: {
			1: sprinkles({
				fontSize: 'xl',
				fontWeight: 'semibold',
				lineHeight: '7',
			}),
			2: sprinkles({
				fontSize: 'lg',
				fontWeight: 'medium',
				lineHeight: '6.5',
			}),
			3: sprinkles({
				fontSize: 'base',
				fontWeight: 'normal',
				lineHeight: '6',
			}),
		},
		inline: {
			true: sprinkles({
				display: 'inline-block',
			}),
		},
	},
	defaultVariants: {
		level: 3,
	},
});

/**
 * Typography SubText
 */
export const subText = recipe({
	base: sprinkles({}),

	variants: {
		level: {
			1: sprinkles({
				fontSize: 'sm',
				fontWeight: 'medium',
				lineHeight: '5.5',
			}),
			2: sprinkles({
				fontSize: 'sm',
				fontWeight: 'medium',
				lineHeight: '5.5',
			}),
			3: sprinkles({
				fontSize: 'xs',
				fontWeight: 'medium',
				lineHeight: '5',
			}),
			4: sprinkles({
				fontSize: 'xs',
				fontWeight: 'medium',
				lineHeight: '5',
			}),
		},
		inline: {
			true: sprinkles({
				display: 'inline-block',
			}),
		},
	},
});

/**
 * Typography FootNote
 */
export const footNote = recipe({
	base: sprinkles({
		lineHeight: '5',
	}),

	variants: {
		level: {
			1: sprinkles({
				fontSize: 'xxs',
				fontWeight: 'semibold',
			}),
			2: sprinkles({
				fontSize: 'xxs',
				fontWeight: 'medium',
			}),
			3: sprinkles({
				fontSize: 'xxxs',
				fontWeight: 'medium',
				lineHeight: '3',
			}),
		},
	},
});
