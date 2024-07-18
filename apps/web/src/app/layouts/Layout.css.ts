import { sprinkles } from '@jung/design-system/styles';
import { globalStyle } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';

globalStyle('a', {
	textDecoration: 'none',
	color: 'black',
});

globalStyle('body', {
	margin: 0,

	boxSizing: 'border-box',
});

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100dvh',
});

export const main = style([
	sprinkles({
		minHeight: 'full',
		maxWidth: '11/12',
		gridTemplateColumns: {
			desktop: '1/12',
			laptop: '1/8',
			tablet: '1/6',
			mobile: '1/6',
		},
		gridColumnGap: {
			desktop: '6',
			laptop: '5',
			mobile: '4',
		},

		width: {
			mobile: 'tablet',
			tablet: 'tablet',
			laptop: 'laptop',
			desktop: 'desktop',
		},
	}),
]);

export const section = style([
	sprinkles({
		minHeight: 'full',
		gridColumn: {
			mobile: '1/7',
			tablet: '1/7',
			laptop: '1/9',
			desktop: '1/13',
		},
	}),
]);
