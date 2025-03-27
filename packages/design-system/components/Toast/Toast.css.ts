import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

const baseToast = style({
	padding: '12px 16px',
	borderRadius: '8px',
	boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
	display: 'flex',
	alignItems: 'center',
	maxWidth: '300px',
	width: '100%',
	transition: 'all 0.3s ease-in-out',
	opacity: 0,
	transform: 'translateY(20px)',
});

const slideIn = keyframes({
	'0%': { opacity: 0, transform: 'translateY(20px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

export const toastRecipe = recipe({
	base: [
		baseToast,
		style({
			animation: `${slideIn} 0.3s ease-out forwards`,
		}),
	],

	variants: {
		type: {
			success: sprinkles({
				background: 'primary100',
				color: 'white',
			}),
			error: sprinkles({
				background: 'error',
				color: 'white',
			}),
			info: sprinkles({
				background: 'info',
				color: 'white',
			}),
			warning: sprinkles({
				background: 'warning',
				color: 'black',
			}),
		},
	},

	defaultVariants: {
		type: 'success',
	},
});

export const icon = style({
	marginRight: '12px',
	flexShrink: 0,
});

export const message = style({
	flex: 1,
	fontSize: '14px',
	lineHeight: '1.4',
});
