import { style } from '@vanilla-extract/css';
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
		variant: {
			hero: style([
				sprinkles({
					fontWeight: 'bold',
					color: 'primary',
					marginBottom: '6',
				}),
				{
					fontSize: '7rem',
					lineHeight: '1',
					fontWeight: 900,
					letterSpacing: '-0.03em',
					textTransform: 'uppercase',

					WebkitTextStroke: '2px #0142C0',

					background: 'linear-gradient(180deg, #0142C0 0%, #002766 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',

					textShadow: `
						2px 2px 0 #0142C0,
						-2px -2px 0 #0142C0,
						2px -2px 0 #0142C0,
						-2px 2px 0 #0142C0,
						4px 4px 0px rgba(1, 66, 192, 0.3)
					`,
				},
			]),
		},
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
