import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';
import { palette } from '../../tokens/palette';

export const badge = recipe({
	base: style([
		sprinkles({
			borderRadius: 'sm',
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
			primary: style([
				sprinkles({
					color: 'white',
					background: 'primary',
				}),
				{
					':hover': {
						backgroundColor: palette.primary200,
					},
				},
			]),

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

		size: {
			sm: sprinkles({
				paddingX: '2',
				paddingY: '1',
				fontSize: 'xs',
			}),
			md: sprinkles({
				paddingX: '2.5',
				paddingY: '1.5',
				fontSize: 'sm',
			}),
			lg: sprinkles({
				paddingX: '3',
				paddingY: '2',
				fontSize: 'base',
			}),
		},
		rounded: {
			true: sprinkles({
				borderRadius: '2xl',
			}),
			false: sprinkles({
				borderRadius: 'sm',
			}),
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'sm',
		rounded: true,
	},
});
