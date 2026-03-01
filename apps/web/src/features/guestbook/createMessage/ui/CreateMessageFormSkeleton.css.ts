import { keyframes, style } from '@vanilla-extract/css';

const ROW_GAP = '8px';
const RADIUS_MD = '6px';

const shimmer = keyframes({
	'0%': { backgroundPosition: '-468px 0' },
	'100%': { backgroundPosition: '468px 0' },
});

const skeletonBase = style({
	backgroundImage:
		'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
	backgroundSize: '800px 100%',
	animation: `${shimmer} 1.5s infinite linear`,
	'@media': {
		'(prefers-reduced-motion: reduce)': {
			animation: 'none',
		},
	},
});

export const formSkeleton = style({
	padding: '0.75rem',
	backgroundColor: 'white',
	borderRadius: '12px',
	boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
	width: '100%',
	maxWidth: '560px',
});

export const pickerRow = style({
	display: 'flex',
	gap: ROW_GAP,
	flexWrap: 'wrap',
});

export const emojiItem = style([
	skeletonBase,
	{
		width: '32px',
		height: '32px',
		borderRadius: RADIUS_MD,
	},
]);

export const colorItem = style([
	skeletonBase,
	{
		width: '22px',
		height: '22px',
		borderRadius: '3px',
	},
]);

export const textareaBlock = style([
	skeletonBase,
	{
		width: '100%',
		height: '64px',
		borderRadius: RADIUS_MD,
	},
]);

export const buttonBlock = style([
	skeletonBase,
	{
		width: '80px',
		height: '36px',
		borderRadius: RADIUS_MD,
		alignSelf: 'flex-end',
	},
]);
