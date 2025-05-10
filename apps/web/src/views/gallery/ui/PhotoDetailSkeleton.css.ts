import { keyframes, style } from '@vanilla-extract/css';

export const pulseKeyframes = keyframes({
	'0%, 100%': {
		opacity: 1,
	},
	'50%': {
		opacity: 0.5,
	},
});

const baseSkeletonStyle = style({
	animation: `${pulseKeyframes} 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
	backgroundColor: '#e0e0e0',
	borderRadius: '4px',
});

export const skeletonImage = style([baseSkeletonStyle, {}]);

export const skeletonTitle = style([
	baseSkeletonStyle,
	{
		height: '28px',
		width: '75%',
	},
]);

export const skeletonTextLine = style([
	baseSkeletonStyle,
	{
		height: '20px',
	},
]);

export const skeletonTextLineFull = style([
	skeletonTextLine,
	{
		width: '100%',
	},
]);

export const skeletonTextLineMedium = style([
	skeletonTextLine,
	{
		width: '83.333333%',
	},
]);

export const skeletonTextLineShort = style([
	skeletonTextLine,
	{
		width: '33.333333%',
	},
]);

export const skeletonTag = style([
	baseSkeletonStyle,
	{
		height: '24px',
	},
]);

export const skeletonTagShort = style([
	skeletonTag,
	{
		width: '64px',
	},
]);

export const skeletonTagMedium = style([
	skeletonTag,
	{
		width: '80px',
	},
]);

export const skeletonLikesCount = style([
	baseSkeletonStyle,
	{
		height: '20px',
		width: '25%',
	},
]);

export const skeletonActionButton = style([
	baseSkeletonStyle,
	{
		height: '36px',
		width: '36px',
		borderRadius: '9999px',
	},
]);
