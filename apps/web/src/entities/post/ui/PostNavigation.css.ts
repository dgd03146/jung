import { breakpoints } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const linkText = style({
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.02em',
});

export const sidebar = style({
	'@media': {
		[`screen and (min-width: ${breakpoints.laptop}px)`]: {
			height: calc.subtract('100dvh', '144px'),
		},
	},
});

export const sidebarHeader = style({
	fontFamily: 'var(--font-bebas)',
	marginBottom: '8px',
	letterSpacing: '0.02em',
});

const slideIn = keyframes({
	'0%': { transform: 'translateX(-100%)' },
	'100%': { transform: 'translateX(0)' },
});

export const backButton = style({
	position: 'relative',
	overflow: 'hidden',
	transition: 'all 0.3s ease',
	fontFamily: 'var(--font-bebas)',

	':before': {
		content: '',
		position: 'absolute',
		left: '-100%',
		top: 0,
		width: '100%',
		height: '100%',
		transition: 'all 0.3s ease',
		zIndex: -1,
	},

	':hover': {
		transform: 'translateX(5px)',

		':before': {
			left: 0,
		},
	},
});
