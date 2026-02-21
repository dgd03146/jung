import { style } from '@vanilla-extract/css';
import { FONT_HEADING } from './tokens';

export const page = style({
	minHeight: '100vh',
	background:
		'linear-gradient(135deg, var(--bg-page-from) 0%, var(--bg-page-mid) 50%, var(--bg-page-from) 100%)',
	position: 'relative',
	overflow: 'hidden',
	fontFamily: FONT_HEADING,
	transition: 'background 0.3s',
});

export const gridOverlay = style({
	position: 'absolute',
	inset: 0,
	backgroundImage: `
		linear-gradient(var(--grid-color) 1px, transparent 1px),
		linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
	`,
	backgroundSize: '60px 60px',
	pointerEvents: 'none',
});
