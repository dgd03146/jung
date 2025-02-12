import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.5 },
});

export const skeletonBase = style({
	background: '#e2e8f0',
	animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const skeletonUploadArea = style([
	skeletonBase,
	{
		width: '100%',
		aspectRatio: '3/2',
		borderRadius: '12px',
	},
]);

export const skeletonInput = style([
	skeletonBase,
	{
		width: '100%',
		height: '40px',
		borderRadius: '8px',
		marginBottom: '20px',
	},
]);

export const skeletonTextarea = style([
	skeletonBase,
	{
		width: '100%',
		height: '100px',
		borderRadius: '8px',
		marginBottom: '20px',
	},
]);

export const skeletonLabel = style([
	skeletonBase,
	{
		width: '20%',
		height: '20px',
		borderRadius: '8px',
		marginBottom: '20px',
	},
]);
