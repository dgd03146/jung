import { keyframes, style } from '@vanilla-extract/css';
import * as styles from './PhotoCollection.css';

const pulse = keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.5 },
});

const skeletonBase = style({
	background: '#e2e8f0',
	animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const skeletonImage = style([
	skeletonBase,
	{
		width: '100%',
		height: '100%',
	},
]);

export const skeletonTitle = style([
	skeletonBase,
	{
		width: '60%',
		height: '24px',
		borderRadius: '4px',
		marginBottom: '8px',
	},
]);

export const skeletonDescription = style([
	skeletonBase,
	{
		width: '100%',
		height: '32px',
		borderRadius: '4px',
	},
]);

export const skeletonPhotoCount = style([
	skeletonBase,
	{
		width: '80px',
		height: '16px',
		borderRadius: '4px',
	},
]);

export const skeletonDate = style([
	skeletonBase,
	{
		width: '100px',
		height: '16px',
		borderRadius: '4px',
	},
]);

export const {
	pageWrapper,
	mainSection,
	header,
	title,
	addButton,
	gridView,
	collectionCard,
	imageContainer,
	content,
	footer,
} = styles;
