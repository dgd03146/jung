import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100dvh',
	backgroundColor: palette.swiss,
	overflow: 'hidden',
});
