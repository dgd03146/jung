import { style } from '@vanilla-extract/css';

export const container = style({
	flex: 1,
	maxWidth: '720px',
	width: '100%',
});

export const editorSkeleton = style({
	minHeight: '400px',
	borderRadius: '8px',
	marginBottom: '32px',
});

export const likeButtonSkeleton = style({
	width: '120px',
	height: '40px',
	borderRadius: '8px',
	marginBottom: '32px',
});

export const commentsSkeleton = style({
	width: '100%',
	height: '200px',
	borderRadius: '8px',
	marginTop: '16px',
});

export const commentHeader = style({
	width: '180px',
	height: '28px',
	borderRadius: '4px',
	marginBottom: '16px',
});
