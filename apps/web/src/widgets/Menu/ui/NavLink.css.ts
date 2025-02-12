import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

export const mainNav = style([
	sprinkles({
		flexDirection: 'column',

		gap: {
			mobile: '4', // 16px
			tablet: '6', // 24px
			desktop: '8', // 32px
		},
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
		gap: {
			mobile: '2', // 8px
			tablet: '4', // 16px
			desktop: '6', // 24px
		},
	}),
	{
		fontFamily: 'var(--font-bebas)',
	},
]);
