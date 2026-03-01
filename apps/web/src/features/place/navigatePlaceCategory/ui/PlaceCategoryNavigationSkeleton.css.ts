import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': { backgroundPosition: '-200px 0' },
	'100%': { backgroundPosition: '200px 0' },
});

export const nav = style({
	display: 'flex',
	gap: '20px',
	marginBottom: '16px',
});

export const skeletonTab = style({
	width: '72px',
	height: '24px',
	borderRadius: '2px',
	background: '#E2E8F0',
	backgroundImage:
		'linear-gradient(to right, #E2E8F0 0%, #EDF2F7 20%, #E2E8F0 40%, #E2E8F0 100%)',
	backgroundSize: '400px 24px',
	animationDuration: '1.5s',
	animationFillMode: 'forwards',
	animationIterationCount: 'infinite',
	animationName: shimmer,
	animationTimingFunction: 'linear',
});
