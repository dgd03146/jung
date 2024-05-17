import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const card = recipe({
	base: [
		sprinkles({
			borderRadius: '2xl',
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

/**
 * ImageMedia
 */

export const imageWrapper = sprinkles({
	borderRadius: '2xl',
});
globalStyle(`${imageWrapper} img`, {
	maxInlineSize: '100%',

	blockSize: 'auto',
	objectFit: 'cover',
	borderRadius: '16px',
	display: 'block', // Ensure the image is displayed as a block-level element
});
