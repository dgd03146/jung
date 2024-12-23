import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const wrapper = style({
	position: 'relative',
	overflow: 'hidden',
	background: '#ffffff',
});

export const container = style([
	sprinkles({
		paddingY: {
			mobile: '8',
			tablet: '12',
			desktop: '16',
		},
	}),
	{
		minHeight: calc.subtract('100dvh', '144px'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
]);

export const heading = style([
	sprinkles({
		// fontSize: {
		// 	mobile: '7xl',
		// 	tablet: '9xl',
		// 	desktop: '11xl',
		// },
		// lineHeight: {
		// 	mobile: '14',
		// 	tablet: '18',
		// 	desktop: 'hero',
		// },
		fontWeight: 'bold',
		color: 'primary',
		marginBottom: '6',
	}),
	{
		fontSize: '7rem',
		lineHeight: '1',
		fontWeight: 900,
		letterSpacing: '-0.03em',
		textTransform: 'uppercase',

		WebkitTextStroke: '2px #0142C0',

		background: 'linear-gradient(180deg, #0142C0 0%, #002766 100%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',

		textShadow: `
      2px 2px 0 #0142C0,
      -2px -2px 0 #0142C0,
      2px -2px 0 #0142C0,
      -2px 2px 0 #0142C0,
      4px 4px 0px rgba(1, 66, 192, 0.3)
    `,
	},
]);
