import { globalStyle, style } from '@vanilla-extract/css';

export const imgContainer = style({
	flex: '1',
	height: '300px',
});

export const link = style({
	display: 'flex',
	alignItems: 'center',
	columnGap: '4px',
});

export const textContainer = style({
	flex: '1',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
});

globalStyle(`${imgContainer} img`, {
	maxInlineSize: '100%',
	blockSize: 'auto',
	objectFit: 'cover',
	borderRadius: '16px',
	display: 'block', // Ensure the image is displayed as a block-level element
});
