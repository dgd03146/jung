import { mediaQueries } from '@jung/design-system/tokens';
import { recipe } from '@vanilla-extract/recipes';

export const postList = recipe({
	base: {
		width: '100%',
	},
	variants: {
		viewMode: {
			list: {
				display: 'flex',
				flexDirection: 'column',
			},
			grid: {
				padding: '0 0 24px 0',
				display: 'grid',
				gap: '24px',
				gridTemplateColumns: 'repeat(3, 1fr)',
				'@media': {
					[mediaQueries.laptop]: {
						padding: '0 0 16px 0',
						gridTemplateColumns: 'repeat(2, 1fr)',
					},
					[mediaQueries.tablet]: {
						gridTemplateColumns: 'repeat(1, 1fr)',
					},
				},
			},
			table: {
				display: 'flex',
				flexDirection: 'column',
				padding: '0 0 16px 0',
			},
		},
	},
});
