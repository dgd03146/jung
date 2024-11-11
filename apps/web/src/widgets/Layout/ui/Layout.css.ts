import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100dvh',
});

export const main = style([
	sprinkles({
		display: 'grid',
		marginX: 'auto',
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
		},
	}),
	{
		flex: '1 0 auto',
	},
]);

export const section = style([
	sprinkles({
		gridColumn: {
			mobile: '1/7',
			tablet: '1/7',
			laptop: '1/9',
			desktop: '1/13',
		},
	}),
]);
