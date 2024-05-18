import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles';

export const trigger = recipe({
	base: style([
		sprinkles({
			width: 'full',
			cursor: 'pointer',
			color: 'primary',
			padding: '1',
			borderColor: 'primary',
		}),
	]),
	variants: {
		variant: {
			primary: sprinkles({
				borderWidth: 'hairline',
				borderStyle: 'solid',
			}),
			secondary: style([
				sprinkles({
					borderRadius: 'none', // Ensuring rounded is false for secondary
				}),
				{
					borderBottom: '0.5px solid',
				},
			]),
		},

		rounded: {
			true: sprinkles({
				borderRadius: '2xl',
			}),
			false: {
				borderRadius: 'none',
			},
		},
		isActive: {
			true: {
				borderBottom: '2px solid',
			},
			false: {
				borderBottom: '0.5px solid',
			},
		},
	},

	compoundVariants: [
		{
			variants: {
				variant: 'primary',
				isActive: true,
			},
			style: sprinkles({
				border: 'none',
				background: 'primary',
			}),
		},
	],
});

export const tab = recipe({
	base: sprinkles({
		textAlign: 'center',
	}),
	variants: {
		variant: {
			primary: sprinkles({
				color: 'primary',
			}),
			secondary: sprinkles({
				borderColor: 'primary',
				marginBottom: '1',
			}),
		},

		isActive: {
			true: sprinkles({
				color: 'primary',
			}),
			false: sprinkles({
				color: {
					base: 'primary',
					hover: 'primary200',
				},
			}),
		},
	},

	compoundVariants: [
		{
			variants: {
				variant: 'primary',
				isActive: true,
			},
			style: sprinkles({
				color: 'white',
			}),
		},
		{
			variants: {
				variant: 'secondary',
				isActive: false,
			},
			style: sprinkles({
				color: 'primary100',
			}),
		},
	],
});
