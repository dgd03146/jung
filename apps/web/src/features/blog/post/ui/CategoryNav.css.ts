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
	'@media': {
		'(max-width: 1024px)': {
			display: 'flex',
			width: '100%',
		},
	},
});

export const categoryLink = recipe({
	base: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '16px',

		textDecoration: 'none',
		transition: 'all 0.15s ease',
		position: 'relative',
		borderBottom: `1px solid ${palette.primary50}`,

		fontSize: '13.5px',
		fontWeight: '600',
		color: '#1a1a1a',
		letterSpacing: '-0.01em',

		'@media': {
			'(max-width: 1024px)': {
				borderBottom: 'none',
				padding: '8px 16px',
				backgroundColor: '#f5f7ff',
				borderRadius: '8px',
				whiteSpace: 'nowrap',
			},
		},

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

export const count = style({
	fontSize: '13px',
	color: palette.primary,
	backgroundColor: palette.primary50,
	padding: '2px 4px',
	borderRadius: '12px',
	fontWeight: 'normal',

	'@media': {
		'(max-width: 768px)': {
			display: 'none',
		},
	},
});
