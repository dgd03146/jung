import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sidebar = style({
	minWidth: '184px',
	position: 'sticky',
	top: '56px',
	height: 'fit-content',
	backgroundColor: 'white',
	zIndex: 10,
	borderRight: `1px solid ${palette.primary50}`,
	display: 'none',

	'@media': {
		'(min-width: 768px)': {
			display: 'block',
		},
	},
});

export const categoryLink = recipe({
	base: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '8px 16px',

		textDecoration: 'none',
		transition: 'all 0.15s ease',
		position: 'relative',
		borderBottom: `1px solid ${palette.primary50}`,

		fontSize: '13.5px',
		fontWeight: '600',
		color: '#1a1a1a',
		letterSpacing: '-0.01em',

		':hover': {
			backgroundColor: 'rgba(1, 66, 192, 0.03)',
			color: '#0142C0',
		},
	},
	variants: {
		active: {
			true: {
				color: '#0142C0',
				backgroundColor: 'rgba(1, 66, 192, 0.06)',
				fontWeight: '500',

				':before': {
					content: '""',
					position: 'absolute',
					left: 0,
					top: 0,
					bottom: 0,
					width: '3px',
					backgroundColor: '#0142C0',
				},
			},
		},
	},
});
