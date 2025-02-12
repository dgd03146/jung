import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

export const sectionTitle = style([
	sprinkles({
		color: 'primary',
	}),
	{
		fontFamily: 'var(--font-bebas)',
	},
]);
