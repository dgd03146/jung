import { palette } from '@jung/design-system/tokens';
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
      ${palette.overlayWhite0} 0,
      ${palette.overlayWhite20} 20%,
      ${palette.overlayWhite50} 60%,
      ${palette.overlayWhite0}
    )`,
		animation: `${shimmer} 2s infinite`,
	},
});
