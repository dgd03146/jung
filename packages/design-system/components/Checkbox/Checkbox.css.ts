import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const label = recipe({
	base: [
		sprinkles({
			display: 'flex',
			alignItems: 'center',
			columnGap: '1',
		}),
	],
	variants: {
		disabled: {
			true: sprinkles({
				cursor: 'not-allowed',
			}),
			false: sprinkles({
				cursor: 'pointer',
			}),
		},
	},
	defaultVariants: {
		disabled: false,
	},
});

export const iconWrapper = recipe({
	base: [
		sprinkles({
			borderColor: 'primary',
			borderWidth: 'hairline',
			borderStyle: 'solid',
			width: '6',
			height: '6',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 'sm',
		}),
	],
	variants: {
		checked: {
			true: sprinkles({
				background: 'primary',
				// border: 'none',
				color: 'white',
			}),
			false: sprinkles({
				background: 'white',
				color: 'primary',
			}),
		},
	},
	defaultVariants: {
		checked: false,
	},
});

export const input = style({
	overflow: 'hidden',
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: '0',
	margin: '-1px',
	clipPath: 'polygon(0 0, 0 0, 0 0)',
	whiteSpace: 'nowrap',
});
