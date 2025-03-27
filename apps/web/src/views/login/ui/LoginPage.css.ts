import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		minHeight: calc.subtract('100dvh', '192px'),
	},
]);

export const card = style([
	sprinkles({
		padding: { base: '4', tablet: '6', laptop: '10' },
		borderRadius: 'xl',
		boxShadow: 'primary',
	}),
	{
		minWidth: '320px',
		'@media': {
			'(min-width: 768px)': {
				minWidth: '400px',
			},
		},
	},
]);
