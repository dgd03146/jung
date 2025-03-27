import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';
import { palette } from '../../tokens';

export const input = recipe({
	base: [
		sprinkles({
			width: 'full',
			background: 'transparent',

			borderStyle: 'solid',
		}),
		style({
			borderWidth: '0.5px',
			transition: 'transform 0.15s ease, opacity 0.15s ease',
			outline: 'none',
			':focus': {
				outline: 'none',
				borderColor: 'transparent',
				boxShadow: `0 0 0 0.5px ${palette.primary}, 0 0 0 2px ${palette.primary50}`,
			},

			'::placeholder': {
				color: palette.gray300,
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
			zero: sprinkles({
				padding: '0',
			}),

			sm: sprinkles({
				paddingX: '2.5',
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

		disabled: {
			true: style([
				sprinkles({
					borderColor: 'primary100',
					cursor: 'not-allowed',
					background: 'primary50',
				}),
				{
					outline: 'none',
					opacity: 0.6,
				},
			]),
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'sm',
		error: false,
	},
});
