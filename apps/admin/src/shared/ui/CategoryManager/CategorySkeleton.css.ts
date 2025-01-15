import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': {
		backgroundPosition: '-1000px 0',
	},
	'100%': {
		backgroundPosition: '1000px 0',
	},
});

const skeletonBase = style({
	background: 'linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
	backgroundSize: '1000px 100%',
	animation: `${shimmer} 2s infinite linear`,
	borderRadius: '8px',
});

export const pageWrapper = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
});

export const statsSection = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
	gap: '1rem',
});

export const statCard = style({
	background: 'white',
	borderRadius: '16px',
	padding: '24px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	border: '1px solid #f1f5f9',
});

export const statValueSkeleton = style([
	skeletonBase,
	{
		height: '32px',
		width: '80px',
	},
]);

export const statLabelSkeleton = style([
	skeletonBase,
	{
		height: '16px',
		width: '120px',
	},
]);

export const mainSection = style({
	background: 'white',
	borderRadius: '16px',
	border: '1px solid #f1f5f9',
	overflow: 'hidden',
});

export const header = style({
	padding: '20px 24px',
	borderBottom: '1px solid #f1f5f9',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const titleSkeleton = style([
	skeletonBase,
	{
		height: '24px',
		width: '180px',
	},
]);

export const actionsSkeleton = style([
	skeletonBase,
	{
		height: '40px',
		width: '120px',
	},
]);

export const gridView = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
	gap: '20px',
	padding: '24px',
});

export const cardSkeleton = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	borderTop: '4px solid #e2e8f0',
	overflow: 'hidden',
});

export const cardHeaderSkeleton = style({
	padding: '16px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const cardTitleSkeleton = style([
	skeletonBase,
	{
		height: '20px',
		width: '140px',
	},
]);

export const cardActionsSkeleton = style([
	skeletonBase,
	{
		height: '28px',
		width: '70px',
	},
]);

export const cardContentSkeleton = style({
	padding: '16px',
});

export const descriptionSkeleton = style([
	skeletonBase,
	{
		height: '16px',
		width: '100%',
		marginBottom: '8px',
	},
]);

export const cardFooterSkeleton = style({
	padding: '12px 16px',
	borderTop: '1px solid #f1f5f9',
	background: '#F9FAFB',
});

export const postCountSkeleton = style([
	skeletonBase,
	{
		height: '16px',
		width: '60px',
	},
]);
