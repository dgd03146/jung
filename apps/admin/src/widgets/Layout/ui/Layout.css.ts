import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

const SIDEBAR_WIDTH = '240px';

export const mainContent = recipe({
	base: {
		width: '100%',
		transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
	},
	variants: {
		sidebarOpen: {
			true: {
				marginLeft: SIDEBAR_WIDTH,
			},
			false: {
				marginLeft: '0',
			},
		},
	},
});

export const section = style({
	minHeight: calc.subtract('100dvh', '64px'),
});
