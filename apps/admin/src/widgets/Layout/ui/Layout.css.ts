// import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

// FIXME: style 따로 css.ts로 안 빼도 될듯?

export const container = style({
	display: 'flex',

	minHeight: '100dvh',
});
