import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const imgContainer = style({
	flexShrink: 0,
	width: '240px',
	aspectRatio: '16/9',
	maxInlineSize: '100%',
	blockSize: 'auto',
	borderRadius: '8px',
	overflow: 'hidden',
	position: 'relative',
});

export const date = style({
	fontWeight: '400',
	color: palette.primary,
});

export const postHeaderContainer = style({
	paddingBottom: '24px',
	borderBottom: '1px solid',
	borderColor: palette.primary50,
});

export const description = style({
	fontWeight: '400',
	fontSize: '14px',
	color: palette.primary400,
});

export const category = style({
	// display: 'inline-block',
	padding: '2px 8px',
	backgroundColor: 'rgba(1, 66, 192, 0.06)',
	color: '#0142C0',
	borderRadius: '4px',
	fontSize: '16px',
	fontWeight: '500',
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.04em',
});
