import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const card = style([
	sprinkles({
		padding: { mobile: '6', tablet: '8' },
		borderRadius: 'xl',
		boxShadow: 'primary',
		width: 'full',
		background: 'white',
	}),
	{
		maxWidth: '400px',
		'@media': {
			'(max-width: 640px)': {
				maxWidth: calc.subtract('100%', '32px'),
			},
		},
	},
]);

export const fieldContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	minHeight: '80px',
});

export const fieldError = sprinkles({
	fontSize: 'sm',
	color: 'error',
	height: '5',
	lineHeight: '5',
});
