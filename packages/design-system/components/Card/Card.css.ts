import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const card = recipe({
	base: [
		sprinkles({
			background: 'transparent',
		}),
	],

	variants: {
		variant: {
			primary: [
				sprinkles({}),
				style({
					// box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
					boxShadow: 'rgba(1, 66, 192, 0.2) 1.95px 1.95px 2.6px',
				}),
			],
			secondary: sprinkles({
				background: 'primary',
				color: 'white',
			}),
			outline: sprinkles({
				borderColor: 'primary',
				borderWidth: '1px',
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
