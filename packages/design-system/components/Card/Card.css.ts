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
	},
	defaultVariants: {
		variant: 'primary',
		layout: 'vertical',
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
