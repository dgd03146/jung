import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

export const mainNav = style([
	sprinkles({
		flexDirection: 'column',

		rowGap: {
			mobile: '4',
			tablet: '12',
		},
		columnGap: '8',
	}),
	{
		fontFamily: 'var(--font-bebas)',
	},
]);

export const subNav = style([
	sprinkles({
		width: {
			mobile: 'full',
			tablet: 'auto',
		},
		flexDirection: 'column',
		alignItems: 'flex-start',
		rowGap: {
			mobile: '4',
			tablet: '10',
		},
		columnGap: '4',
	}),
	{
		fontFamily: 'var(--font-bebas)',
	},
]);
