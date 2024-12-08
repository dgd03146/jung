import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
	display: 'flex',
	margin: 'auto',
	gap: '8px',
	padding: '16px 80px',
	overflowX: 'auto',
	scrollbarWidth: 'none',
	backgroundColor: palette.white,
	borderBottom: `1px solid ${palette.primary50}`,

	'::-webkit-scrollbar': {
		display: 'none',
	},

	'@media': {
		'(max-width: 768px)': {
			padding: '12px 24px',
			gap: '6px',
		},
	},
});

export const link = style({
	textDecoration: 'none',
});

export const categoryTag = recipe({
	base: {
		padding: '4px 8px',
		fontSize: '14px',
		fontWeight: 500,
		cursor: 'pointer',
		whiteSpace: 'nowrap',
		transition: 'all 0.3s ease',
		border: `1px solid ${palette.primary100}`,
		backgroundColor: palette.white,
		color: palette.primary200,

		selectors: {
			'&:hover': {
				backgroundColor: palette.primary200,
				color: palette.white,
			},
		},
	},
	variants: {
		selected: {
			true: {
				backgroundColor: palette.primary,
				color: palette.white,
				borderColor: palette.primary,

				selectors: {
					'&:hover': {
						backgroundColor: palette.primary,
					},
				},
			},
		},
	},
});
