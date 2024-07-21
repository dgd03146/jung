import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const button = recipe({
	base: [],
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

			ghost: sprinkles({
				border: 'none',
				background: {
					base: 'transparent',
					// hover: 'primary',
				},
				color: {
					base: 'primary',
					hover: 'primary100',
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
				color: 'primary',
				cursor: 'default',
			}),
		},
		disabled: {
			true: sprinkles({
				cursor: 'not-allowed',
				background: 'primary100',
				color: 'primary',
			}),
		},
	},
	// defaultVariants: {
	// 	variant: 'primary',
	// 	size: 'sm',
	// 	// loading: false,
	// 	// rounded: false,
	// 	// disabled: false,
	// },

	compoundVariants: [
		{
			variants: {
				loading: true,
			},
			style: sprinkles({
				cursor: 'default',
				background: {
					base: 'primary100',
					hover: 'primary100',
				},
			}),
		},
		{
			variants: {
				loading: true,
				variant: 'primary',
			},
			style: sprinkles({
				cursor: 'default',
				background: {
					base: 'primary100',
					hover: 'transparent',
				},
			}),
		},
	],
});
