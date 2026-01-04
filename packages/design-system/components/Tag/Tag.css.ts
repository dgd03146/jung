import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';
import { palette } from '../../tokens/palette';

export const tag = recipe({
	base: style([
		sprinkles({
			borderRadius: 'sm',
			cursor: 'pointer',
			display: 'inline-flex',
			alignItems: 'center',
			gap: '1',
		}),
		{
			transition: 'transform 0.3s ease, opacity 0.3s ease',
		},
	]),
	variants: {
		variant: {
			primary: style({
				color: 'white',
				background: palette.primary,
				':hover': {
					background: palette.primary200,
				},
			}),

			secondary: style([
				sprinkles({
					display: 'inline-flex',
					alignItems: 'center',
					color: 'primary',
				}),
				{
					backgroundColor: 'rgba(1, 66, 192, 0.04)',
					':hover': {
						backgroundColor: 'rgba(1, 66, 192, 0.1)',
					},
				},
			]),

			ghost: sprinkles({
				background: 'transparent',
				padding: '0',
			}),
		},

		selected: {
			true: {},
		},

		size: {
			sm: sprinkles({
				paddingX: '2.5',
				paddingY: '1',
			}),
			md: sprinkles({
				padding: '3',
				paddingY: '1.5',
			}),
			lg: sprinkles({
				paddingX: '4',
				paddingY: '2',
			}),
		},
	},
	compoundVariants: [
		{
			variants: {
				variant: 'primary',
				selected: true,
			},
			style: sprinkles({
				background: 'primary300',
			}),
		},
		{
			variants: {
				variant: 'secondary',
				selected: true,
			},
			style: style({
				backgroundColor: palette.primary,
				':hover': {
					backgroundColor: palette.primary200,
				},
				color: 'white',
			}),
		},
		{
			variants: {
				variant: 'ghost',
				selected: true,
			},
			style: sprinkles({
				background: 'primary',
				color: 'white',
				fontWeight: 'semibold',
			}),
		},
	],
});
