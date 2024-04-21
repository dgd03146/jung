import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const card = recipe({
	base: [
		sprinkles({
			background: 'transparent',
		}),
		style({
			maxWidth: '282px',
		}),
	],

	variants: {
		variant: {
			primary: [
				sprinkles({
					boxShadow: 'primary',
				}),
			],
			secondary: sprinkles({
				background: 'primary',
				color: 'white',
			}),
			outline: sprinkles({
				borderColor: 'primary',
				borderWidth: 'hairline',
				borderStyle: 'solid',
			}),
			ghost: sprinkles({
				border: 'none',
			}),
		},
		size: {
			base: sprinkles({
				padding: '0',
			}),
			sm: sprinkles({
				padding: '2.5',
			}),
			md: sprinkles({
				padding: '4',
			}),
			lg: sprinkles({
				padding: '5',
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
		size: 'base',
		rounded: false,
	},
});
