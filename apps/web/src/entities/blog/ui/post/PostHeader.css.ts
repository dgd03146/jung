import { style } from '@vanilla-extract/css';

export const imgContainer = style({
	flexShrink: 0,
	width: '240px',
	aspectRatio: '16/9',
	maxInlineSize: '100%',
	blockSize: 'auto',
	borderRadius: '8px',
	overflow: 'hidden',
	position: 'relative',
});

export const category = style({
	fontFamily: 'var(--font-bebas)',

	padding: '2px 8px',
	borderRadius: '4px',
});

export const container = style({
	borderBottomWidth: '1px',
});
