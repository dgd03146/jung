import { keyframes, style } from '@vanilla-extract/css';
import * as styles from './PhotoCollectionDetail.css.ts';

const shimmer = keyframes({
	'0%': {
		backgroundPosition: '-1000px 0',
	},
	'100%': {
		backgroundPosition: '1000px 0',
	},
});

const skeletonBase = style({
	background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
	backgroundSize: '1000px 100%',
	animation: `${shimmer} 2s infinite linear`,
});

export const container = style([
	styles.pageWrapper,
	{
		background: '#FFFFFF',
	},
]);

export const header = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '24px',
	borderBottom: '1px solid #F3F4F6',
});

export const title = style([
	skeletonBase,
	{
		width: '250px',
		height: '28px',
		borderRadius: '4px',
	},
]);

export const actions = style({
	display: 'flex',
	gap: '12px',
	alignItems: 'center',
});

export const button = style([
	skeletonBase,
	{
		width: '120px',
		height: '40px',
		borderRadius: '6px',
	},
]);

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '24px',
	padding: '24px',
	overflow: 'auto',
});

export const photo = style([
	skeletonBase,
	{
		width: '100%',
		height: '0',
		paddingBottom: '100%',
		borderRadius: '8px',
		position: 'relative',
		overflow: 'hidden',
		backgroundColor: '#f3f4f6',
	},
]);
