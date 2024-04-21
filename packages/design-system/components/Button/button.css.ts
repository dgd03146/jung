import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const button = recipe({
	base: [sprinkles({})],
	variants: {
		variant: {
			primary: sprinkles({
				borderColor: 'primary',
				borderWidth: 'hairline',
				borderStyle: 'solid',
				background: {
					base: 'transparent',
					hover: 'primary',
				},
				color: {
					base: 'primary',
					hover: 'white',
				},
			}),
			secondary: sprinkles({
				background: {
					base: 'primary',
					hover: 'primary200',
				},
				color: {
					base: 'white',
					hover: 'white',
				},
				border: 'none',
			}),
			// outline: sprinkles({
			// 	borderWidth: 'hairline',
			// 	borderStyle: 'solid',
			// 	borderColor: 'gray200',

			// 	background: {
			// 		base: 'white',
			// 		hover: 'black',
			// 	},
			// 	color: {
			// 		hover: 'white',
			// 	},
			// }),
			ghost: sprinkles({
				border: 'none',
				background: {
					base: 'transparent',
					hover: 'primary',
				},
				color: {
					base: 'primary',
					hover: 'white',
				},
			}),
		},
		size: {
			sm: sprinkles({
				paddingX: '2.5',
				paddingY: '1.5',
			}),
			md: sprinkles({
				paddingX: '3',
				paddingY: '2',
			}),
			lg: sprinkles({
				paddingX: '3.5',
				paddingY: '2.5',
			}),
		},
		rounded: {
			true: sprinkles({
				borderRadius: '2xl',
			}),
		},
		loading: {
			true: sprinkles({
				background: 'primary100',
				color: 'white',
				cursor: 'default',
			}),
		},
		disabled: {
			true: sprinkles({
				cursor: 'not-allowed',
				background: 'primary100',
				color: 'white',
			}),

			false: sprinkles({
				cursor: 'pointer',
			}),
		},
	},
	defaultVariants: {
		size: 'sm',
		rounded: false,
		disabled: false,
	},
});
