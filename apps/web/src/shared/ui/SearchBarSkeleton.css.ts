import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';

const shimmerAnimation = keyframes({
	'0%': {
		transform: 'translateX(-100%)',
	},
	'100%': {
		transform: 'translateX(100%)',
	},
});

export const skeletonInput = style({
	position: 'relative',
	overflow: 'hidden',
	pointerEvents: 'none',
	background: palette.gray,
	borderRadius: '4px',
	margin: '0 8px',
});

export const shimmer = style({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	background: `linear-gradient(90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%)`,
	animation: `${shimmerAnimation} 1.5s infinite linear`,
});
