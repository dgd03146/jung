import { breakpoints } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';

export const shimmer = keyframes({
	'0%': {
		backgroundPosition: '-1000px 0',
	},
	'100%': {
		backgroundPosition: '1000px 0',
	},
});

export const gridContainer = style({
	display: 'grid',
	gap: '8px',
	gridTemplateColumns: 'minmax(0px, 1fr)',
	'@media': {
		[`(min-width: ${breakpoints.tablet})`]: {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
	},
});

export const skeletonContainer = style({
	borderTopWidth: '1px',
});

export const gridItem = style({
	gridTemplateColumns: 'minmax(0px, 1fr)',
	'@media': {
		[`(min-width: ${breakpoints.tablet})`]: {
			gridTemplateColumns: 'auto-fit',
		},
	},
});

export const borderTopWidth = style({
	borderTopWidth: '1px',
});

export const borderBottomWidth = style({
	borderBottomWidth: '1px',
});
