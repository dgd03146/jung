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
    ${palette.gray} 0%, 
    ${palette.gray} 20%, 
    ${palette.gray} 40%)`,
	animation: `${shimmerAnimation} 1.5s infinite linear`,
});
