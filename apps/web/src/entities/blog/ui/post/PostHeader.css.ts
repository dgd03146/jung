import {
	fontSizes,
	fontWeights,
	palette,
	space,
} from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const imgContainer = style({
	flexShrink: 0,
	width: '240px',
	aspectRatio: '16/9',
	maxInlineSize: '100%',
	blockSize: 'auto',
	overflow: 'hidden',
	position: 'relative',
});

export const category = style({
	fontSize: fontSizes.xxxs,
	fontWeight: fontWeights.medium,
	color: palette.swiss,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	padding: `${space['1']} ${space['2']}`,
	backgroundColor: palette.swissLight,
});

export const container = style({
	borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
});
