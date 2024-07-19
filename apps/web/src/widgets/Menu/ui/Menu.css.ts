import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const stairs = style([
	sprinkles({
		top: 0,
		left: 0,
		position: 'fixed',
		zIndex: '20',
		height: 'screenDvh',
		display: 'flex',
	}),
	{
		transition: 'all 1s',
		// pointerEvents: 'none',
	},
]);

export const stair = style([
	sprinkles({
		background: 'primary',
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
	height: calc.subtract('100dvh', '12rem'),
});

export const routeContainer = sprinkles({
	flexDirection: {
		mobile: 'column',
		tablet: 'row',
	},
});
