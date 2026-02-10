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

export const skeletonCardStyle = style({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	borderRadius: '12px',
	overflow: 'hidden',
	marginBottom: '16px',
});

export const imageSkeleton = style([
	skeletonShimmer,
	{
		width: '100%',
		height: 'auto',
		aspectRatio: '4/3',
		backgroundColor: palette.gray,
	},
]);

export const titleSkeleton = style([
	skeletonShimmer,
	{
		height: '20px',
		width: '80%',
		backgroundColor: palette.gray,
		borderRadius: '4px',
	},
]);

export const addressSkeleton = style([
	skeletonShimmer,
	{
		height: '16px',
		width: '60%',
		backgroundColor: palette.gray,
		borderRadius: '4px',
	},
]);

export const descriptionSkeleton = style([
	skeletonShimmer,
	{
		height: '16px',
		width: '100%',
		backgroundColor: palette.gray,
		borderRadius: '4px',
	},
]);

export const ratingSkeleton = style([
	skeletonShimmer,
	{
		height: '16px',
		width: '30%',
		backgroundColor: palette.gray,
		borderRadius: '4px',
	},
]);

export const placeListGrid = style({
	gridTemplateColumns: 'minmax(0px, 1fr)',

	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
		'(min-width: 1024px)': {
			gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
		},
	},
});
