import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { skeletonShimmer } from './skeleton.css';

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'minmax(0px, 1fr)',
	gap: '24px',

	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
		'(min-width: 1024px)': {
			gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
		},
	},
});

export const card = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '4/5',
	borderRadius: '0',
	overflow: 'hidden',
});

export const cardImage = style([
	skeletonShimmer,
	{
		width: '100%',
		height: '100%',
		backgroundColor: palette.gray100,
	},
]);

export const cardOverlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '25px',
	background: `linear-gradient(to top, ${palette.overlay40} 0%, rgba(0,0,0,0) 100%)`,
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const titleLine = style([
	skeletonShimmer,
	{
		width: '60%',
		height: '20px',
		borderRadius: '4px',
		backgroundColor: palette.overlayWhite30,
	},
]);

export const countLine = style([
	skeletonShimmer,
	{
		width: '80px',
		height: '14px',
		borderRadius: '4px',
		backgroundColor: palette.overlayWhite20,
	},
]);
