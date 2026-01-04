import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';
import { palette } from '../../tokens/palette';

export const textarea = recipe({
	base: [
		sprinkles({
			width: 'full',
			background: 'transparent',
			borderStyle: 'solid',
		}),
		style({
			borderWidth: '0.5px',
			transition: 'transform 0.15s ease, opacity 0.15s ease',
			resize: 'none',
			outline: 'none',
			':focus': {
				outline: 'none',
				borderColor: 'transparent',
				boxShadow: `0 0 0 0.5px ${palette.primary}, 0 0 0 2px ${palette.primary50}`,
			},
		}),
	],
	variants: {
		variant: {
			primary: sprinkles({
				borderColor: 'white300',
				borderWidth: 'hairline',
				borderStyle: 'solid',
			}),

			secondary: [
				sprinkles({
					borderColor: 'primary200',
					borderWidth: 'hairline',
					borderStyle: 'solid',
					background: 'white',
				}),
				style({
					':focus': {
						boxShadow: `0 0 0 1px ${palette.primary300}, 0 0 0 3px ${palette.primary50}`,
					},
				}),
			],
			ghost: style({
				border: 'none',
				outlineColor: 'transparent',
			}),
		},

		error: {
			true: [
				sprinkles({
					borderColor: 'error',
					borderWidth: 'hairline',
					borderStyle: 'solid',
					background: 'white',
				}),
				style({
					':focus': {
						boxShadow: `0 0 0 1px ${palette.secondary}, 0 0 0 3px ${palette.secondary100}`,
					},
				}),
			],
		},

		size: {
			base: sprinkles({
				paddingX: '0',
				paddingY: '0',
			}),
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
