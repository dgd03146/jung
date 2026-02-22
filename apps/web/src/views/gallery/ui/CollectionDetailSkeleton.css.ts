import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': {
		transform: 'translateX(-100%)',
	},
	'100%': {
		transform: 'translateX(100%)',
	},
});

const skeletonShimmer = style({
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

export const headerSection = style([
	skeletonShimmer,
	{
		position: 'relative',
		height: '300px',
		marginBottom: '2rem',
		borderRadius: '1rem',
		overflow: 'hidden',
		backgroundColor: palette.gray100,
	},
]);

export const gradientOverlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '1.5rem',
	background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const titleLine = style({
	width: '40%',
	height: '24px',
	borderRadius: '4px',
	backgroundColor: 'rgba(255, 255, 255, 0.3)',
});

export const descriptionLine = style({
	width: '60%',
	height: '16px',
	borderRadius: '4px',
	backgroundColor: 'rgba(255, 255, 255, 0.2)',
});

export const countLine = style({
	width: '80px',
	height: '14px',
	borderRadius: '4px',
	backgroundColor: 'rgba(255, 255, 255, 0.15)',
});
