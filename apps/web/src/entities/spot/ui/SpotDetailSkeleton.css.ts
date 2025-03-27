import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': { backgroundPosition: '-1000px 0' },
	'100%': { backgroundPosition: '1000px 0' },
});

const skeletonBase = style({
	background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
	backgroundSize: '1000px 100%',
	animation: `${shimmer} 2s infinite linear`,
	borderRadius: '4px',
});

export const imageSection = style([
	skeletonBase,
	{
		position: 'relative',
		width: '100%',
		aspectRatio: '16/9',
		minHeight: '320px',
		maxHeight: '50vh',
		backgroundColor: '#f9fafb',
		overflow: 'hidden',
		borderRadius: '12px',

		'@media': {
			'screen and (max-width: 768px)': {
				aspectRatio: '4/3',
				minHeight: '280px',
			},
		},
	},
]);

export const titleSkeleton = style([
	skeletonBase,
	{
		height: '32px',
		width: '70%',
	},
]);

export const iconSkeleton = style([
	skeletonBase,
	{
		width: '16px',
		height: '16px',
		borderRadius: '50%',
		flexShrink: 0,
	},
]);

export const locationSkeleton = style([
	skeletonBase,
	{
		height: '20px',
		width: '50%',
	},
]);

export const dateSkeleton = style([
	skeletonBase,
	{
		height: '24px',
		width: '120px',
		borderRadius: '16px',
	},
]);

export const actionButtonSkeleton = style([
	skeletonBase,
	{
		width: '40px',
		height: '40px',
		borderRadius: '8px',
	},
]);

export const descriptionSkeleton = style([
	skeletonBase,
	{
		height: '80px',
		width: '100%',
	},
]);

export const tagSkeleton = style([
	skeletonBase,
	{
		height: '28px',
		width: '80px',
		borderRadius: '16px',
	},
]);

export const tipItemSkeleton = style([
	skeletonBase,
	{
		height: '60px',
		width: '100%',
		backgroundColor: '#f8fafc',
		padding: '16px',
		borderRadius: '8px',
		border: '1px solid rgba(1, 66, 192, 0.12)',
	},
]);

export const actionBarSkeleton = style({
	borderBottomWidth: '1px',
});
