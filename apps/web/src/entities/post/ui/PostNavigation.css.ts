import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const linkText = style({
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.02em',
});

export const sidebarHeader = style({
	fontFamily: 'var(--font-bebas)',
	marginBottom: '8px',
	letterSpacing: '0.02em',
});

export const sidebar = style({
	height: calc.subtract('100dvh', '144px'),
});
