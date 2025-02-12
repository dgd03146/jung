import { createVar, style } from '@vanilla-extract/css';

export const scrollPosition = createVar();

export const bodyScrollLock = style({
	vars: {
		[scrollPosition]: '0px',
	},
	position: 'fixed',
	top: `calc(${scrollPosition} * -1)`,
	left: 0,
	right: 0,
	bottom: 0,
	overflow: 'hidden',
	transition: 'top 0.3s',
});
