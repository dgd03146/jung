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
		width: {
			mobile: 'tablet',
			tablet: 'tablet',
			laptop: 'laptop',
		},
		marginY: {
			mobile: '4', // 16px
			tablet: '5', // 20px
			laptop: '6', // 24px
		},
	}),
	{
		flex: '1',
		maxWidth: '92%',
		gridTemplateColumns: 'repeat(6, minmax(0px, 1fr))',
		gridColumnGap: '16px',
		'@media': {
			'(min-width: 1024px)': {
				gridTemplateColumns: 'repeat(8, minmax(0px, 1fr))',
				gridColumnGap: '20px',
			},
			'(min-width: 1280px)': {
				gridTemplateColumns: 'repeat(12, minmax(0px, 1fr))',
				gridColumnGap: '24px',
			},
		},
	},
]);

export const section = style({
	// display: 'grid',
	gridColumn: '1/7',

	'@media': {
		'(min-width: 1024px)': {
			gridColumn: '1/9',
		},
		'(min-width: 1280px)': {
			gridColumn: '1/13',
		},
	},
});
