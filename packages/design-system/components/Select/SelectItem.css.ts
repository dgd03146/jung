import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';
import { vars } from '../../styles/theme.css';

// export const selectedColor = createVar();

export const li = style([
	sprinkles({
		background: 'primary100',
	}),
	{
		boxSizing: 'border-box',
		caretColor: 'transparent',
		selectors: {
			'&:hover': {
				backgroundColor: vars.palette.primary,
			},
			'&:focus': {
				backgroundColor: vars.palette.primary,
				outlineColor: vars.palette.primary,
			},
		},
		// background: selectedColor,
		outlineStyle: 'solid',
		outlineWidth: '1px',
	},
]);
