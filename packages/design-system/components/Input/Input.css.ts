import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';
import { palette } from '../../tokens';

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
		style({
			':focus': {
				outline: 'none',
				borderColor: 'transparent',
				boxShadow: `0 0 0 1px ${palette.primary}, 0 0 0 3px ${palette.primary50}`,
				transition: 'all 0.2s ease',
			},
			':hover': {
				borderColor: palette.primary200,
				transition: 'all 0.2s ease',
			},
		}),
	],
	variants: {
		variant: {
			primary: sprinkles({
				borderColor: 'primary',
				borderWidth: 'hairline',
				borderStyle: 'solid',
			}),

			ghost: sprinkles({
				border: 'none',
			}),
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
	},
});
