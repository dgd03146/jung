import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
	minWidth: 0,
	'@media': {
		'(min-width: 1024px)': {
			borderTopWidth: '1px',
			borderBottomWidth: '1px',
			borderColor: palette.gray100,
			borderStyle: 'solid',
			paddingTop: '32px',
			paddingBottom: '32px',
		},
	},
});

export const header = style({
	fontFamily: 'var(--font-bebas)',
	marginBottom: '8px',
	letterSpacing: '0.02em',
});

export const tocItem = recipe({
	base: {
		display: 'block',
		textAlign: 'left',
		fontSize: '13px',
		lineHeight: 1.5,
		color: palette.primary300,
		transition: 'color 0.15s ease',
		cursor: 'pointer',
		background: 'none',
		border: 'none',
		padding: '4px 0',
		width: '100%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',

		':hover': {
			color: palette.primary,
		},
	},
	variants: {
		level: {
			1: { paddingLeft: 0 },
			2: { paddingLeft: '12px' },
			3: { paddingLeft: '24px' },
		},
		active: {
			true: {
				color: palette.primary,
				fontWeight: 600,
			},
			false: {},
		},
	},
	defaultVariants: {
		level: 1,
		active: false,
	},
});
