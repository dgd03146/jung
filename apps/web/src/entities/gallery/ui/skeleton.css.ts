import { keyframes, style } from '@vanilla-extract/css';

export const shimmer = keyframes({
	'0%': {
		transform: 'translateX(-100%)',
	},
	'100%': {
		transform: 'translateX(100%)',
	},
});

export const skeletonShimmer = style({
	position: 'relative',
	overflow: 'hidden',
	'::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		transform: 'translateX(-100%)',
		backgroundImage: `linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    )`,
		animation: `${shimmer} 2s infinite`,
	},
});
