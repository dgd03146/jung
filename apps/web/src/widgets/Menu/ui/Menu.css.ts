import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const stairs = style([
	sprinkles({
		position: 'fixed',
		zIndex: '50',
		height: 'screenDvh',
		display: 'flex',
	}),
	{
		top: 0,
		left: 0,
		transition: 'all 1.5s',
	},
]);

export const stair = style([
	sprinkles({
		background: 'primary50',
	}),
	{
		width: '20vw',
		height: '100%',
	},
]);

export const background = sprinkles({
	width: 'full',
	height: 'full',
	position: 'absolute',
	background: 'primary',
});

export const container = style({
	height: calc.subtract('100dvh', '144px'),
});
