import { palette } from '@jung/design-system/tokens';
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
		background: `conic-gradient(from 0deg, ${palette.primary} 0deg, ${palette.primary100} 200deg, transparent 280deg)`,
		WebkitMask: 'radial-gradient(farthest-side, transparent 60%, black 61%)',
		mask: 'radial-gradient(farthest-side, transparent 60%, black 61%)',
		animation: `${spin} 0.9s linear infinite`,
		'@media': {
			'(prefers-reduced-motion: reduce)': {
				animation: 'none',
			},
		},
	},
	variants: {
		size: {
			tiny: style({
				width: '12px',
				height: '12px',
			}),
			small: style({
				width: '16px',
				height: '16px',
			}),
			medium: style({
				width: '24px',
				height: '24px',
			}),
			large: style({
				width: '40px',
				height: '40px',
			}),
		},
	},
});
