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
				padding: '24px 0',
				display: 'grid',
				gap: '24px',
				gridTemplateColumns: 'repeat(3, 1fr)',
				'@media': {
					'(max-width: 1024px)': {
						padding: '16px 0',
						gridTemplateColumns: 'repeat(2, 1fr)',
					},
					'(max-width: 768px)': {
						gridTemplateColumns: 'repeat(1, 1fr)',
					},
				},
			},
			table: {
				display: 'flex',
				flexDirection: 'column',
				padding: '16px 0',
			},
		},
	},
});
