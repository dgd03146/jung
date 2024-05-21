import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const textarea = recipe({
	base: [
		style({
			resize: 'none',
			outline: 'none',
		}),
		sprinkles({
			color: {
				base: 'primary',
				placeholder: 'primary100',
			},

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

			secondary: sprinkles({
				background: 'primary100',
				border: 'none',
				color: {
					base: 'primary',
					placeholder: 'primary200',
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
				paddingY: '2',
			}),
			md: sprinkles({
				paddingX: '3',
				paddingY: '3',
			}),
			lg: sprinkles({
				paddingX: '4',
				paddingY: '4',
			}),
		},
		rounded: {
			true: sprinkles({
				borderRadius: '2xl',
			}),
		},
		disabled: {
			true: style([
				sprinkles({
					cursor: 'not-allowed',
				}),
				{
					outline: 'none',
				},
			]),
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'sm',
		rounded: false,
	},
});
