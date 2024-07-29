import { globalStyle, style } from '@vanilla-extract/css';

export const imgContainer = style({
	height: '250px',
	borderRadius: '2xl',
});

export const link = style({
	display: 'flex',
	alignItems: 'center',
	columnGap: '4px',
});

globalStyle(`${imgContainer} img`, {
	maxInlineSize: '100%',
	blockSize: 'auto',
	objectFit: 'cover',
	borderRadius: '16px',
	display: 'block', // Ensure the image is displayed as a block-level element
});

export const textContainer = style({});

globalStyle(`${textContainer} p`, {
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});
