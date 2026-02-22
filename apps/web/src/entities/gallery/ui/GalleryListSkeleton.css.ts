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

export const container = style({
	height: '100vh',
	overflowY: 'hidden',
});

export const section = style({
	display: 'flex',
	height: '100vh',
	'@media': {
		'(max-width: 767px)': {
			flexDirection: 'column',
		},
	},
});

export const sectionReverse = style({
	flexDirection: 'row-reverse',
	'@media': {
		'(max-width: 767px)': {
			flexDirection: 'column',
		},
	},
});

export const imageHalf = style([
	skeletonShimmer,
	{
		width: '50%',
		backgroundColor: palette.gray100,
		'@media': {
			'(max-width: 767px)': {
				width: '100%',
				height: '60vh',
			},
		},
	},
]);

export const contentHalf = style({
	width: '50%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: '64px',
	backgroundColor: palette.gray50,
	'@media': {
		'(max-width: 767px)': {
			width: '100%',
			padding: '32px 24px',
		},
	},
});

export const textLine = style([
	skeletonShimmer,
	{
		height: '14px',
		borderRadius: '4px',
		backgroundColor: palette.gray100,
	},
]);

export const textLineShort = style({
	width: '80px',
	marginBottom: '24px',
});

export const textLineTitle = style({
	width: '200px',
	height: '28px',
	marginBottom: '16px',
});

export const textLineDesc = style({
	width: '300px',
	marginBottom: '8px',
});

export const textLineDate = style({
	width: '120px',
	marginBottom: '32px',
});

export const tagsRow = style({
	display: 'flex',
	gap: '8px',
	marginBottom: '32px',
});

export const tagPill = style([
	skeletonShimmer,
	{
		width: '60px',
		height: '26px',
		borderRadius: '20px',
		backgroundColor: palette.gray100,
	},
]);

export const linkLine = style([
	skeletonShimmer,
	{
		width: '70px',
		height: '13px',
		borderRadius: '4px',
		backgroundColor: palette.gray100,
	},
]);
