import { breakpoints, palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const skeletonCardStyle = style({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	borderRadius: '12px',
	overflow: 'hidden',
	marginBottom: '16px',
});

export const imageSkeleton = style({
	width: '100%',
	height: 'auto',
	aspectRatio: '4/3',
	backgroundColor: palette.gray,
});

export const titleSkeleton = style({
	height: '20px',
	width: '80%',
	backgroundColor: palette.gray,
	borderRadius: '4px',
});

export const addressSkeleton = style({
	height: '16px',
	width: '60%',
	backgroundColor: palette.gray,
	borderRadius: '4px',
});

export const descriptionSkeleton = style({
	height: '16px',
	width: '100%',
	backgroundColor: palette.gray,
	borderRadius: '4px',
});

export const ratingSkeleton = style({
	height: '16px',
	width: '30%',
	backgroundColor: palette.gray,
	borderRadius: '4px',
});

export const spotListGrid = style({
	gridTemplateColumns: 'minmax(0px, 1fr)',

	'@media': {
		[`(min-width: ${breakpoints.tablet})`]: {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
		[`(min-width: ${breakpoints.laptop})`]: {
			gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
		},
	},
});
