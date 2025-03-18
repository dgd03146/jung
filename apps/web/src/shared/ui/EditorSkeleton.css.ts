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

export const editorSkeleton = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
	width: '100%',
	padding: '16px 0',
});

export const titleSkeleton = style([
	skeletonShimmer,
	{
		height: '32px',
		width: '85%',
		borderRadius: '6px',
		backgroundColor: palette.gray,
	},
]);

export const paragraphSkeleton = style([
	skeletonShimmer,
	{
		height: '16px',
		width: '100%',
		borderRadius: '4px',
		backgroundColor: palette.gray,
	},
]);

export const shortParagraphSkeleton = style([
	paragraphSkeleton,
	{
		width: '65%',
	},
]);

export const imageSkeleton = style([
	skeletonShimmer,
	{
		height: '220px',
		width: '100%',
		borderRadius: '8px',
		backgroundColor: palette.gray,
	},
]);

export const listSkeleton = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	paddingLeft: '24px',
});

export const listItemSkeleton = style([
	skeletonShimmer,
	{
		height: '16px',
		width: '90%',
		borderRadius: '4px',
		backgroundColor: palette.gray,
	},
]);

export const codeSkeleton = style([
	skeletonShimmer,
	{
		height: '120px',
		width: '100%',
		borderRadius: '8px',
		backgroundColor: palette.gray,
		marginTop: '8px',
		marginBottom: '8px',
	},
]);
