import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const categoryHeader = style({
	width: '100%',
	padding: '8px 12px',
	display: 'flex',
	justifyContent: 'space-between',

	alignItems: 'center',
	cursor: 'pointer',
	userSelect: 'none',

	transition: 'all 0.2s ease',
	gap: '8px',
	// backgroundColor: 'rgba(1, 66, 192, 0.08)',
	boxShadow: '0 0 0 1px rgba(1, 66, 192, 0.08)',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.03)',
		color: '#0142C0',
	},
});

export const categoryHeaderLink = recipe({
	base: {},
	variants: {
		active: {
			true: {
				backgroundColor: 'rgba(1, 66, 192, 0.07)',
			},
		},
	},
});

export const categoryItem = recipe({
	base: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '8px 16px',
		fontSize: '13px',
		textDecoration: 'none',
		transition: 'all 0.15s ease',
		position: 'relative',
		borderBottom: '0.5px solid #EFEFEF',

		':last-child': {
			borderBottom: 'none',
		},

		':hover': {
			backgroundColor: 'rgba(1, 66, 192, 0.03)',
			color: '#0142C0',
		},
		'@media': {
			'(max-width: 768px)': {
				fontSize: '12px',
			},
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

export const chevronIcon = recipe({
	base: {
		color: '#0142C0',
		opacity: 0.7,
		transition: 'transform 0.2s ease',
	},
	variants: {
		isOpen: {
			true: {
				transform: 'rotate(180deg)',
			},
			false: {
				transform: 'rotate(0)',
			},
		},
	},
});

export const categoryContent = recipe({
	base: {
		borderRadius: '8px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
		border: '1px solid rgba(1, 66, 192, 0.08)',
		transition: 'all 0.3s ease',

		'@media': {
			'(max-width: 1024px)': {
				position: 'absolute',
				zIndex: 10,
				backgroundColor: 'white',
				width: '100%',
				top: '100%',
			},
		},
	},
	variants: {
		isOpen: {
			true: {
				height: 'auto',
				opacity: 1,
			},
			false: {
				height: '0',
				opacity: 0,
				overflow: 'hidden',
			},
		},
	},
});

export const categoryName = style({
	fontWeight: 'inherit',
});

export const categoryCount = style({
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
