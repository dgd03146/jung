import {
	borderRadius,
	borderWidths,
	extendedSpace,
	fontFamily,
	fontSizes,
	fontWeights,
	opacity,
	palette,
	space,
} from '../tokens';

import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
	space,
	contentWidth: {
		...extendedSpace,
		...space,
	},
	opacity,
	fontFamily,
	fontSizes,
	fontWeights,
	palette,
	border: {
		width: borderWidths,
		radius: borderRadius,
	},
});
