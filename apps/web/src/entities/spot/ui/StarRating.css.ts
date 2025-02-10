import { palette } from '@jung/design-system/tokens';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
	},
	variants: {
		interactive: {
			true: {
				cursor: 'pointer',
			},
		},
	},
});

export const star = recipe({
	base: {
		padding: 0,
		border: 'none',
		background: 'none',
		cursor: 'inherit',
		transition: 'transform 0.2s ease',

		selectors: {
			'&:hover:not(:disabled)': {
				transform: 'scale(1.2)',
			},
			'&:disabled': {
				cursor: 'default',
			},
		},
	},
	variants: {
		size: {
			sm: {
				fontSize: '14px',
			},
			md: {
				fontSize: '18px',
			},
			lg: {
				fontSize: '24px',
			},
		},
	},
});

export const icon = recipe({
	base: {
		transition: 'color 0.2s ease',
	},
	variants: {
		filled: {
			true: {
				color: palette.primary,
			},
			false: {
				color: palette.primary100,
			},
		},
	},
});
