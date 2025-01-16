import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const button = recipe({
	base: sprinkles({
		transition: 'fast',
		display: 'flex',
		alignItems: 'center',
		columnGap: '1',
	}),
	variants: {
		variant: {
			primary: sprinkles({
				background: {
					base: 'primary',
					hover: 'primary200',
				},
				color: {
					base: 'white',
					// hover: 'primary',
				},
			}),
			outline: sprinkles({
				borderColor: 'primary100',
				borderWidth: 'hairline',
				borderStyle: 'solid',
				background: {
					hover: 'primary50',
				},
				color: {
					base: 'primary200',
					hover: 'primary',
					active: 'primary',
				},
			}),
			secondary: sprinkles({
				background: {
					base: 'primary100',
					hover: 'primary',
				},
				color: {
					base: 'primary',
					hover: 'white',
				},
			}),
			ghost: sprinkles({
				background: {
					base: 'transparent',
					hover: 'primary50',
				},
				color: {
					base: 'primary',
					hover: 'primary200',
				},
			}),
		},
		size: {
			zero: sprinkles({
				padding: '0',
			}),
			sm: sprinkles({
				paddingX: '2', // 8px
				paddingY: '1', // 4px
			}),
			md: sprinkles({
				paddingX: '3', // 12px
				paddingY: '1.5', // 6px
			}),
			lg: sprinkles({
				paddingX: '3.5', // 14px
				paddingY: '2.5', // 10px
			}),
		},

		selected: {
			true: {},
		},

		loading: {
			true: sprinkles({
				background: 'primary100',
				color: 'primary',
				cursor: 'default',
			}),
		},
		disabled: {
			true: sprinkles({
				cursor: 'not-allowed',
				background: {
					base: 'primary100',
				},
				color: {
					base: 'primary',
				},
			}),
		},
	},

	compoundVariants: [
		{
			variants: {
				loading: true,
			},
			style: sprinkles({
				cursor: 'default',
				background: {
					base: 'primary100',
					hover: 'primary100',
				},
			}),
		},
		{
			variants: {
				loading: true,
				variant: 'primary',
			},
			style: sprinkles({
				cursor: 'default',
				background: {
					base: 'primary100',
					hover: 'transparent',
				},
			}),
		},
		{
			variants: {
				variant: 'primary',
				selected: true,
			},
			style: sprinkles({
				background: 'primary200',
				color: 'white',
				fontWeight: 'semibold',
			}),
		},
		{
			variants: {
				variant: 'secondary',
				selected: true,
			},
			style: sprinkles({
				background: 'primary100',
				color: 'primary200',
				fontWeight: 'semibold',
			}),
		},
		{
			variants: {
				variant: 'outline',
				selected: true,
			},
			style: [
				sprinkles({
					background: 'primary50',
					borderColor: 'primary200',
					boxShadow: 'tertiary',
					fontWeight: 'semibold',
					color: 'primary',
				}),
			],
		},
	],
});
