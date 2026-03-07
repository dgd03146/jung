import { fontWeights, borderRadius as radii } from '@jung/design-system/tokens';
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
	padding: '2px 8px',
	borderRadius: radii.sm,
	fontWeight: fontWeights.semibold,
	letterSpacing: '-0.01em',
});

export const container = style({
	borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
});
