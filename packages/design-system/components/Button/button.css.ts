import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';
import { palette } from '../../tokens/palette';

export const button = recipe({
	base: style([
		sprinkles({
			display: 'flex',
			alignItems: 'center',
			columnGap: '1',
		}),
		{
			transition: 'transform 0.15s ease, opacity 0.15s ease',
		},
	]),
	variants: {
		variant: {
			primary: style([
				sprinkles({
					background: 'primary',
					color: 'white',
				}),

				{
					':hover': {
						transform: 'translateY(-1px)',
						boxShadow: '0 4px 8px rgba(1, 66, 192, 0.2)',
						backgroundColor:
							'linear-gradient(135deg, #0136A3 0%, #0142C0 100%)',
					},
				},
			]),
			outline: style([
				sprinkles({
					borderColor: 'primary100',
					borderWidth: 'hairline',
					borderStyle: 'solid',
					background: 'white',
					color: 'primary200',
				}),
				{
					':hover': {
						transform: 'translateY(-1px)',
						borderColor: 'rgba(1, 66, 192, 0.4)',
						backgroundColor: 'rgba(1, 66, 192, 0.04)',
						boxShadow: '0 2px 6px rgba(1, 66, 192, 0.12)',
						color: '#0142C0',
					},
				},
			]),
			secondary: style([
				sprinkles({
					background: 'primary50',
					color: 'primary',
				}),
				{
					':hover': {
						transform: 'translateY(-1px)',
						backgroundColor: '#DBE8FF',
						boxShadow: '0 3px 12px rgba(1, 66, 192, 0.15)',
						color: palette.primary50,
					},
				},
			]),

			ghost: style([
				sprinkles({
					background: 'transparent',
					color: 'primary',
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
				paddingX: '4', // 16px
				paddingY: '2', // 8px
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
				background: 'primary100',
				color: 'primary',
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
				background: 'primary100',
			}),
		},
		{
			variants: {
				loading: true,
				variant: 'primary',
			},
			style: style([
				sprinkles({
					cursor: 'default',
					background: 'primary100',
				}),
				{
					':hover': {
						backgroundColor: 'transparent',
					},
				},
			]),
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
			style: style([
				{
					color: '#0142C0',
					fontWeight: 'semibold',
					backgroundColor: 'rgba(1, 66, 192, 0.07)',
				},
			]),
		},
	],
});
