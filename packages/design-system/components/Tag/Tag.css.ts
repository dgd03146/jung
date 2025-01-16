import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const tag = recipe({
	base: sprinkles({
		borderRadius: 'sm',
		cursor: 'pointer',
		display: 'inline-flex',
		alignItems: 'center',
		gap: '1',
	}),
	variants: {
		variant: {
			primary: sprinkles({
				color: 'white',
				background: {
					base: 'primary',
					hover: 'primary200',
				},
				transition: 'fast',
			}),

			secondary: style([
				sprinkles({
					display: 'inline-flex',
					alignItems: 'center',
					color: 'primary',
					transition: 'fast',
				}),
				{
					backgroundColor: 'rgba(1, 66, 192, 0.04)',
					':hover': {
						backgroundColor: 'rgba(1, 66, 192, 0.08)',
					},
				},
			]),

			ghost: sprinkles({
				background: {
					base: 'transparent',
				},
				color: {},
				padding: '0',
			}),
		},

		selected: {
			true: sprinkles({
				color: 'primary',
				background: {
					base: 'primary50',
					hover: 'primary100',
				},
				fontWeight: 'medium',
				transition: 'fast',
			}),
		},

		size: {
			sm: sprinkles({
				paddingX: '3',
				paddingY: '1.5',
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
	},
	defaultVariants: {
		variant: 'primary',
		size: 'sm',
	},
});
