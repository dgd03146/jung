import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const section = style({
	minHeight: calc.subtract('100dvh', '64px'),
});
