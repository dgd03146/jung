import { sprinkles } from '@jung/design-system/styles';
import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const mainNav = style([
	sprinkles({
		flexDirection: 'column',

		gap: {
			mobile: '4', // 16px
			tablet: '6', // 24px
			laptop: '8', // 32px
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
			laptop: '6', // 24px
		},
	}),
	{
		fontFamily: 'var(--font-bebas)',
	},
]);

export const navLinkText = style({
	':hover': {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary200,
	},
});
