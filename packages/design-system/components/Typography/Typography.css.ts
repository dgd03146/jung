import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles';

/**
 * Typography Heading
 */
export const heading = recipe({
	base: [
		sprinkles({
			fontWeight: 'bold',
		}),
	],
	variants: {
		level: {
			1: sprinkles({
				fontSize: '2xl', // 24px
				lineHeight: '8', // 32px
			}),
			2: sprinkles({
				fontSize: 'xl', // 20px
				lineHeight: '7', //  28px
			}),
			3: sprinkles({
				fontSize: 'lg', // 18px
				lineHeight: '6.5', // 24px
			}),
			4: sprinkles({
				fontSize: 'base', // 16px
				lineHeight: '6', // 24px
			}),
		},
	},
	compoundVariants: [
		{
			variants: {
				level: 4,
			},
			style: sprinkles({
				fontWeight: 'semibold',
			}),
		},
	],
});

/**
 * Typography Text
 */
export const text = recipe({
	base: sprinkles({
		fontSize: 'base',
	}),
	variants: {
		level: {
			1: sprinkles({
				fontWeight: 'semibold',
				lineHeight: '6.5',
			}),
			2: sprinkles({
				fontWeight: 'medium',
				lineHeight: '6.5',
			}),
			3: sprinkles({
				fontWeight: 'medium',
				lineHeight: '7',
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
 * Typography SubText
 */
export const subText = recipe({
	base: sprinkles({
		fontSize: 'sm',
		lineHeight: '5',
	}),

	variants: {
		level: {
			1: sprinkles({
				fontWeight: 'bold',
			}),
			2: sprinkles({
				fontWeight: 'semibold',
			}),
			3: sprinkles({
				fontWeight: 'medium',
			}),
			4: sprinkles({
				fontWeight: 'normal',
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
		fontSize: 'xs',
		lineHeight: '5',
	}),

	variants: {
		level: {
			1: sprinkles({
				fontWeight: 'semibold',
			}),
			2: sprinkles({
				fontWeight: 'medium',
			}),
			3: sprinkles({
				fontSize: 'xxs',
				fontWeight: 'medium',
				lineHeight: '3',
			}),
		},
	},
});
