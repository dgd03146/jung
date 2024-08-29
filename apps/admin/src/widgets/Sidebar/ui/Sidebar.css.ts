import { sprinkles } from '@jung/design-system/styles';
import { recipe } from '@vanilla-extract/recipes';

export const link = recipe({
	base: sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: { mobile: 'center', laptop: 'flex-start' },

		columnGap: '2',
		color: 'primary',
		width: 'full',
		paddingX: { mobile: '3', laptop: '4' },
		paddingY: { mobile: '3', laptop: '6' },
		borderRadius: 'lg',
	}),
	variants: {
		selected: {
			true: sprinkles({ background: 'primary', color: 'white' }),
			false: sprinkles({
				background: { hover: 'primary200' },
				color: { hover: 'white' },
			}),
		},
	},
});
