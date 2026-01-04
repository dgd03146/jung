import { style } from '@vanilla-extract/css';

export const headerContainer = style({
	borderBottomWidth: '1px',
	borderBottomStyle: 'solid',
	borderBottomColor: '#ececec',
});

export const contentFlex = style({
	display: 'flex',
	columnGap: '40px',
});

export const imgContainer = style({
	flexShrink: 0,
	width: '240px',
	aspectRatio: '16/9',
	borderRadius: '8px',
	overflow: 'hidden',
	position: 'relative',
});

export const contentStack = style({
	display: 'flex',
	flexDirection: 'column',
	rowGap: '16px',
	flex: '1',
});

export const dateSkeleton = style({
	marginBottom: '4px',
});

export const titleSkeleton = style({
	marginBottom: '8px',
});

export const descriptionSkeleton = style({
	marginBottom: '16px',
});

export const categorySkeleton = style({
	width: '80px',
	height: '24px',
	borderRadius: '4px',
});
