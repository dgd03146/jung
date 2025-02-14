import { style } from '@vanilla-extract/css';

export const flexContainer = style({
	display: 'flex',
	padding: '40px 0',
	gap: '40px',
});

export const contentContainer = style({
	flex: 1,
	maxWidth: '720px',
});
