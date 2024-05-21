import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const badge = recipe({
	base: [
		sprinkles({
			borderColor: 'primary',
			borderWidth: 'hairline',
			borderStyle: 'solid',
			color: 'primary',
		}),
	],
	variants: {
		variant: {
			primary: sprinkles({
				background: {
					base: 'white',
				},
				color: {},
			}),
			secondary: sprinkles({
				background: {
					base: 'primary',
				},
				color: {
					base: 'white',
				},
			}),

			ghost: sprinkles({
				border: 'none',
				fontWeight: 'bold',
				background: {
					base: 'transparent',
				},
				color: {},
			}),
		},
		size: {
			sm: sprinkles({
				padding: '1',
			}),
			md: sprinkles({
				padding: '2',
			}),
			lg: sprinkles({
				padding: '3',
			}),
		},
		rounded: {
			true: sprinkles({
				borderRadius: '2xl',
			}),
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'sm',
		rounded: true,
	},
});
