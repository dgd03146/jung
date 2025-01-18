import { style } from '@vanilla-extract/css';
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
			primary: style([
				sprinkles({
					background: {
						base: 'primary',
						hover: 'primary200',
					},
					color: 'white',
				}),
				{
					':hover': {
						transform: 'translateY(-1px)',
						boxShadow: '0 4px 8px rgba(1, 66, 192, 0.2)',
						background: 'linear-gradient(135deg, #0136A3 0%, #0142C0 100%)',
					},
				},
			]),
			outline: style([
				sprinkles({
					borderColor: 'primary100',
					borderWidth: 'hairline',
					borderStyle: 'solid',
					background: {
						base: 'white',
					},
					color: {
						base: 'primary200',
					},
				}),
				{
					':hover': {
						transform: 'translateY(-1px)',
						borderColor: 'rgba(1, 66, 192, 0.4)',
						background: 'rgba(1, 66, 192, 0.04)',
						boxShadow: '0 2px 6px rgba(1, 66, 192, 0.12)',
						color: '#0142C0',
					},
				},
			]),
			secondary: style([
				sprinkles({
					background: {
						base: 'primary100',
					},
					color: {
						base: 'primary',
					},
				}),
				{
					':hover': {
						transform: 'translateY(-1px)',
						background:
							'linear-gradient(135deg, rgba(1, 66, 192, 0.12) 0%, rgba(1, 66, 192, 0.08) 100%)',
						boxShadow: '0 3px 7px rgba(1, 66, 192, 0.15)',
						color: '#0136A3',
					},
				},
			]),
			ghost: style([
				sprinkles({
					background: {
						base: 'transparent',
					},
					color: {
						base: 'primary',
					},
				}),
				{
					':hover': {
						transform: 'translateY(-1px)',
						background: 'rgba(1, 66, 192, 0.04)',
						boxShadow: '0 2px 4px rgba(1, 66, 192, 0.08)',
					},
				},
			]),
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
