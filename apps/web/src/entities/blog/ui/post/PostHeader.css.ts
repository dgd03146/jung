import { style } from '@vanilla-extract/css';

const BLUE = '#0033CC';

export const imgContainer = style({
	flexShrink: 0,
	width: '240px',
	aspectRatio: '16/9',
	maxInlineSize: '100%',
	blockSize: 'auto',
	overflow: 'hidden',
	position: 'relative',
});

export const category = style({
	fontSize: '0.625rem',
	fontWeight: 500,
	color: BLUE,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	padding: '4px 8px',
	backgroundColor: 'rgba(0, 51, 204, 0.06)',
});

export const container = style({
	borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
});
