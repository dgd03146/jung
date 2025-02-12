import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const card = recipe({
	base: [
		sprinkles({
			padding: '0',
		}),
	],

	variants: {
		variant: {
			primary: sprinkles({
				borderColor: 'primary',
				borderWidth: 'hairline',
				borderStyle: 'solid',
			}),

			secondary: sprinkles({
				background: 'primary',
				color: 'white',
			}),
			outline: sprinkles({
				boxShadow: 'primary',
			}),
			ghost: sprinkles({
				border: 'none',
			}),
		},
		layout: {
			vertical: sprinkles({
				display: 'flex',
				flexDirection: 'column',
			}),
			horizontal: sprinkles({
				display: 'flex',
				justifyContent: 'space-between',
			}),
		},
		rounded: {
			none: sprinkles({ borderRadius: 'none' }),
			sm: sprinkles({ borderRadius: 'sm' }),
			md: sprinkles({ borderRadius: 'md' }),
			lg: sprinkles({ borderRadius: 'lg' }),
			xl: sprinkles({ borderRadius: 'xl' }),
			'2xl': sprinkles({ borderRadius: '2xl' }),
			'3xl': sprinkles({ borderRadius: '3xl' }),
			full: sprinkles({ borderRadius: 'full' }),
		},
	},
	defaultVariants: {
		variant: 'primary',
		layout: 'vertical',
		rounded: 'none',
	},
});

export const textContainer = style({});

globalStyle(`${textContainer} p`, {
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});
