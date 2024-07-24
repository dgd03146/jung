import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

// box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

export const card = recipe({
	base: [
		sprinkles({
			borderRadius: '2xl',
			padding: '0',
		}),
	],

	variants: {
		variant: {
			primary: sprinkles({
				borderColor: 'primary',
				borderWidth: 'hairline',
				borderStyle: 'solid',
			}),

			secondary: sprinkles({
				background: 'primary',
				color: 'white',
			}),
			outline: sprinkles({
				boxShadow: 'primary',
			}),
			ghost: sprinkles({
				border: 'none',
			}),
		},
		layout: {
			vertical: sprinkles({
				display: 'flex',
				flexDirection: 'column',
			}),
			horizontal: sprinkles({
				display: 'flex',
				justifyContent: 'space-between',
			}),
		},
	},
	defaultVariants: {
		variant: 'primary',
		layout: 'vertical',
	},
});
