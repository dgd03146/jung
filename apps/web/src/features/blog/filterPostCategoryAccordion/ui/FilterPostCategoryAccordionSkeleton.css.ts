import { keyframes, style } from '@vanilla-extract/css';

export const shimmerAnimation = keyframes({
	'0%': {
		backgroundPosition: '-468px 0',
	},
	'100%': {
		backgroundPosition: '468px 0',
	},
});

export const skeletonBase = style({
	background: 'linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%)',
	backgroundSize: '800px 104px',
	animation: `${shimmerAnimation} 1.5s linear infinite forwards`,
	borderRadius: '4px',
});

export const mainCategoryItem = style({
	height: '40px',
	margin: '8px 16px',
});

export const subCategoryItem = style({
	height: '32px',
	margin: '6px 32px 6px 36px',
	width: 'calc(100% - 52px)',
});

export const categoryGroup = style({
	marginBottom: '8px',
});
