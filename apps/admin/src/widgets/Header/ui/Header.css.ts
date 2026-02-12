import { recipe } from '@vanilla-extract/recipes';

export const header = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		top: 0,
		transition: 'all 0.2s ease',
		backgroundColor: 'white',
		borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
	},
	variants: {
		isScrolled: {
			true: {
				boxShadow: '0 1px 6px rgba(0, 0, 0, 0.02)',
			},
		},
	},
});
