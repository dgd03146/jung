import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const spin = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
});

export const spinner = recipe({
	base: {
		display: 'inline-block',
		borderRadius: '50%',
		border: '2px solid transparent',
		borderTopColor: '#007bff',
		borderRightColor: '#007bff',
		animation: `${spin} 0.8s linear infinite`,
	},
	variants: {
		size: {
			tiny: style({
				width: '12px',
				height: '12px',
				borderWidth: '1px',
			}),
			small: style({
				width: '16px',
				height: '16px',
				borderWidth: '2px',
			}),
			medium: style({
				width: '24px',
				height: '24px',
				borderWidth: '2px',
			}),
			large: style({
				width: '32px',
				height: '32px',
				borderWidth: '3px',
			}),
		},
	},
});
