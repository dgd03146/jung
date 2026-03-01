import { keyframes, style } from '@vanilla-extract/css';

export { nav } from './shared.css';

const shimmer = keyframes({
	'0%': { backgroundPosition: '-200px 0' },
	'100%': { backgroundPosition: '200px 0' },
});

export const skeletonTab = style({
	width: '72px',
	height: '24px',
	borderRadius: '2px',
	background: '#E2E8F0',
	backgroundImage:
		'linear-gradient(to right, #E2E8F0 0%, #EDF2F7 20%, #E2E8F0 40%, #E2E8F0 100%)',
	backgroundSize: '400px 24px',
	animation: `${shimmer} 1.5s infinite linear`,
	'@media': {
		'(prefers-reduced-motion: reduce)': {
			animation: 'none',
		},
	},
});
