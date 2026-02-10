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

export const galleryGrid = style({
	display: 'grid',
	gap: '24px',
	gridTemplateColumns: 'repeat(2, 1fr)',

	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(3, 1fr)',
		},
		'(min-width: 1280px)': {
			gridTemplateColumns: 'repeat(4, 1fr)',
		},
	},
});

export const skeletonCard = style([
	skeletonShimmer,
	{
		width: '100%',
		backgroundColor: palette.gray,
		borderRadius: '12px',
	},
]);

export const heightShort = style({
	aspectRatio: '4/3',
});

export const heightMedium = style({
	aspectRatio: '3/4',
});

export const heightTall = style({
	aspectRatio: '2/3',
});

export const heightSquare = style({
	aspectRatio: '1/1',
});
