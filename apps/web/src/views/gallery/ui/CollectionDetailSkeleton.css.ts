import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { skeletonShimmer } from '@/fsd/entities/gallery/ui/skeleton.css';

export const headerSection = style([
	skeletonShimmer,
	{
		position: 'relative',
		height: '300px',
		marginBottom: '2rem',
		borderRadius: '1rem',
		overflow: 'hidden',
		backgroundColor: palette.gray100,
	},
]);

export const gradientOverlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '1.5rem',
	background: `linear-gradient(to top, ${palette.overlay70}, rgba(0,0,0,0))`,
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const titleLine = style({
	width: '40%',
	height: '24px',
	borderRadius: '4px',
	backgroundColor: palette.overlayWhite30,
});

export const descriptionLine = style({
	width: '60%',
	height: '16px',
	borderRadius: '4px',
	backgroundColor: palette.overlayWhite20,
});

export const countLine = style({
	width: '80px',
	height: '14px',
	borderRadius: '4px',
	backgroundColor: palette.overlayWhite15,
});

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '1rem',
});

export const gridItem = style([
	skeletonShimmer,
	{
		aspectRatio: '1',
		borderRadius: '0.5rem',
		backgroundColor: palette.gray100,
	},
]);
