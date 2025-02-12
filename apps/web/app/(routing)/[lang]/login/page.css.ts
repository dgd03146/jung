import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '4',
	}),
	{
		minHeight: calc.subtract('100dvh', '144px'),
	},
]);

export const card = style([
	sprinkles({
		padding: '10',
		borderRadius: 'xl',

		boxShadow: 'primary',
		width: 'full',
	}),
	{
		maxWidth: '400px',
	},
]);
