import { globalStyle, style } from '@vanilla-extract/css';

export const imgContainer = style({
	flex: '1',
	height: '100px',
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
	maxWidth: '100%',
	display: '-webkit-box',
	WebkitLineClamp: 1,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

export const link = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	textDecoration: 'none',
});

export const adjacentPostTitle = style({
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	':hover': {
		textDecoration: 'underline',
	},
});
