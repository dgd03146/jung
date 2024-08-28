import { sprinkles } from '@jung/design-system/styles';
import { recipe } from '@vanilla-extract/recipes';

export const link = recipe({
	base: sprinkles({
		display: 'flex',
		alignItems: 'center',
		columnGap: '2',
		color: 'primary',
		width: 'full',
		paddingX: { mobile: '4', laptop: '2' },
		paddingY: '4',
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
