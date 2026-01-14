import { style } from '@vanilla-extract/css';

const BLUE = '#0033CC';

export const wrapper = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100dvh',
	backgroundColor: BLUE,
	overflow: 'hidden',
});
