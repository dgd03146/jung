import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const input = recipe({
	base: [
		sprinkles({
			color: {
				base: 'primary',
				placeholder: 'primary100',
			},
			outlineColor: 'primary',
			outlineWidth: 'hairline',
			background: 'transparent',
			borderWidth: 'hairline',
			borderStyle: 'solid',
		}),
	],
	variants: {
		variant: {
			primary: sprinkles({
				borderColor: 'primary',
				borderWidth: 'hairline',
				borderStyle: 'solid',
			}),

			outline: sprinkles({
				borderColor: 'black',
				outlineColor: 'black',
				outlineWidth: 'hairline',
				color: {
					base: 'black',
					placeholder: 'gray200',
				},
			}),
			ghost: sprinkles({
				border: 'none',
				outlineColor: 'transparent',
			}),
		},
		size: {
			sm: sprinkles({
				paddingX: '2',
				paddingY: '1',
			}),
			md: sprinkles({
				paddingX: '3',
				paddingY: '1.5',
			}),
			lg: sprinkles({
				paddingX: '4',
				paddingY: '2.5',
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
