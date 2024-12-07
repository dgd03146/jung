import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const tag = recipe({
	base: [sprinkles({})],
	variants: {
		variant: {
			primary: sprinkles({
				borderColor: 'primary',
				borderWidth: 'hairline',
				borderStyle: 'solid',
				color: 'primary',
			}),
			secondary: sprinkles({
				background: 'primary',
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
				paddingX: '3',
				paddingY: '0.5',
			}),
			md: sprinkles({
				padding: '3.5',
				paddingY: '1.5',
			}),
			lg: sprinkles({
				paddingX: '4',
				paddingY: '2',
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
		rounded: false,
	},
});
