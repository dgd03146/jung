import { palette } from '@jung/design-system/tokens';
import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { skeletonShimmer } from './skeleton.css';

export const container = style({
	height: '100vh',
	overflowY: 'hidden',
});

export const section = recipe({
	base: {
		display: 'flex',
		height: '100vh',
		'@media': {
			'(max-width: 767px)': {
				flexDirection: 'column',
			},
		},
	},
	variants: {
		reverse: {
			true: {
				flexDirection: 'row-reverse',
				'@media': {
					'(max-width: 767px)': {
						flexDirection: 'column',
					},
				},
			},
			false: {},
		},
	},
	defaultVariants: {
		reverse: false,
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

const textLineBase = {
	borderRadius: '4px',
	backgroundColor: palette.gray100,
} as const;

export const textLine = styleVariants({
	short: [
		skeletonShimmer,
		{ ...textLineBase, width: '80px', height: '14px', marginBottom: '24px' },
	],
	title: [
		skeletonShimmer,
		{ ...textLineBase, width: '200px', height: '28px', marginBottom: '16px' },
	],
	desc: [
		skeletonShimmer,
		{ ...textLineBase, width: '300px', height: '14px', marginBottom: '8px' },
	],
	date: [
		skeletonShimmer,
		{ ...textLineBase, width: '120px', height: '14px', marginBottom: '32px' },
	],
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
