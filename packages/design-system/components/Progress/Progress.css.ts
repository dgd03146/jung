import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles';

export const track = recipe({
	base: [
		sprinkles({
			background: 'primary100',
			maxWidth: 'full',
			minWidth: 'full',
			borderRadius: 'lg',
		}),
	],
	variants: {
		variant: {
			primary: {},
			secondary: [
				sprinkles({
					background: 'secondary100',
				}),
			],
		},
		size: {
			sm: sprinkles({
				height: '1',
			}),
			md: sprinkles({
				height: '2',
			}),
		},
	},

	defaultVariants: {
		variant: 'primary',
		size: 'sm',
	},
});

export const widthVar = createVar();

export const thumb = recipe({
	base: [
		sprinkles({
			height: 'full',
			maxWidth: 'full',
		}),
		{
			width: widthVar,
		},
	],
	variants: {
		variant: {
			primary: [
				sprinkles({
					background: 'primary',
					borderRadius: 'lg',
				}),
				{
					minWidth: 4,
				},
			],
			secondary: sprinkles({
				background: 'secondary',
			}),
		},
	},

	defaultVariants: {
		variant: 'primary',
	},
});
