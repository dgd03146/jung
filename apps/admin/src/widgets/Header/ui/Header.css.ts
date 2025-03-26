import { recipe } from '@vanilla-extract/recipes';

export const header = recipe({
	base: {
		top: 0,
		transition: 'all 0.3s ease',
		backgroundColor: 'white',
		borderBottom: '1px solid #F1F5F9',
	},
	variants: {
		isScrolled: {
			true: {
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
			},
		},
	},
});
