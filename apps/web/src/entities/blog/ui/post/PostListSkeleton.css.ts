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

export const searchAreaSkeleton = style({
	display: 'flex',
	gap: '10px',
	justifyContent: 'space-between',
	marginBottom: '24px',
	alignItems: 'center',
});

export const searchBarSkeleton = style([skeletonShimmer]);
export const viewToggleSkeleton = style([skeletonShimmer]);

export const skeletonList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	width: '100%',
});

export const postCard = style({
	display: 'flex',
	gap: '40px',
	padding: '24px 0',
	borderBottom: `1px solid ${palette.primary50}`,

	'@media': {
		'(max-width: 768px)': {
			flexDirection: 'column',
			gap: '16px',
		},
	},
});

export const imageArea = style([
	skeletonShimmer,
	{
		width: '200px',
		height: 'auto',
		aspectRatio: '5/4',
		borderRadius: '12px',
		backgroundColor: palette.gray,

		'@media': {
			'(max-width: 768px)': {
				width: '100%',
				height: '280px',
				aspectRatio: '16/9',
			},
		},
	},
]);

export const contentArea = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	flex: 1,
});

export const meta = style({
	display: 'flex',
	gap: '12px',
	alignItems: 'center',
});

export const titleSkeleton = style([skeletonShimmer]);
export const descriptionSkeleton = style([skeletonShimmer]);
export const tagSkeleton = style([skeletonShimmer]);

export const tagList = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '8px',
	marginTop: 'auto',
});
