// error.css.ts
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const errorContainer = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: calc.subtract('100dvh', '144px'),
	padding: '2rem',
	rowGap: '2rem',
	textAlign: 'center',
});
