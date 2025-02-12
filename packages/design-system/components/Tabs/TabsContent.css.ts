import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles';

export const content = recipe({
	base: {},
	variants: {
		isActive: {
			true: sprinkles({ display: 'block' }),
			false: sprinkles({ display: 'none' }),
		},
	},
});
