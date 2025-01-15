import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style([
	sprinkles({
		paddingY: {
			mobile: '8',
			tablet: '12',
			desktop: '16',
		},
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		minHeight: calc.subtract('100dvh', '144px'),
	},
]);
