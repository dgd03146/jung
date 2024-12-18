import { sprinkles } from '@jung/design-system/styles';
import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style([
	sprinkles({
		padding: {
			mobile: '3', // 12px
			tablet: '4', // 16px
		},
		gap: {
			mobile: '2', // 8px
			tablet: '3', // 12px
		},
	}),
	{
		width: '100%',
		position: 'relative',
		display: 'flex',
		flexWrap: 'wrap',
		margin: 'auto',
		overflowX: 'auto',
		scrollbarWidth: 'none',
		backgroundColor: palette.white,
		borderBottom: `1px solid ${palette.primary50}`,

		'::-webkit-scrollbar': {
			display: 'none',
		},
	},
]);

export const categoryTag = recipe({
	base: {
		transition: 'all 0.3s ease',
		border: `1px solid ${palette.primary100}`,
		backgroundColor: palette.white,
		color: palette.primary,
		whiteSpace: 'nowrap',
		cursor: 'pointer',

		'@media': {
			'(min-width: 768px)': {
				padding: '4px 8px',
				fontSize: '14px',
			},
			'(max-width: 767px)': {
				padding: '3px 6px',
				fontSize: '13px',
			},
		},

		selectors: {
			'&:hover': {
				backgroundColor: palette.primary100,
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
