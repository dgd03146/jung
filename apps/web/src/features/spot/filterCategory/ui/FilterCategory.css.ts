import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

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
		marginTop: {
			mobile: '2', // 8px
			tablet: '4', // 16px
		},
		position: 'relative',
		display: 'flex',
		flexWrap: 'wrap',
		margin: 'auto',
		overflow: 'auto',
		width: 'full',
	}),
	{
		scrollbarWidth: 'none',

		'::-webkit-scrollbar': {
			display: 'none',
		},

		borderTop: '1px solid #E2E8F0',
		borderBottom: '1px solid #E2E8F0',
	},
]);
