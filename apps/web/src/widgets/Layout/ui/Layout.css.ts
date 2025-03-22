import { sprinkles } from '@jung/design-system/styles';
import { breakpoints } from '@jung/design-system/tokens';
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
			desktop: '6', // 24px
		},
	}),
	{
		flex: '1 0 auto',
		maxWidth: '92%',
		gridTemplateColumns: 'repeat(6, minmax(0px, 1fr))',
		gridColumnGap: '16px',
		'@media': {
			[`(min-width: ${breakpoints.laptop})`]: {
				gridTemplateColumns: 'repeat(8, minmax(0px, 1fr))',
				gridColumnGap: '20px',
			},
			[`(min-width: ${breakpoints.desktop})`]: {
				gridTemplateColumns: 'repeat(12, minmax(0px, 1fr))',
				gridColumnGap: '24px',
			},
		},
	},
]);

export const section = style({
	gridColumn: '1/7',
	'@media': {
		[`(min-width: ${breakpoints.laptop})`]: {
			gridColumn: '1/9',
		},
		[`(min-width: ${breakpoints.desktop})`]: {
			gridColumn: '1/13',
		},
	},
});
