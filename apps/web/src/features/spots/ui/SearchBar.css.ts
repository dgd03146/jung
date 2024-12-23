import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
});

export const searchWrapper = style({
	position: 'relative',
	width: '100%',
	height: '40px',
	display: 'flex',
	alignItems: 'center',
	background: 'white',

	borderRadius: '8px',
	padding: '0 8px',
	transition: 'all 0.2s ease',
	boxShadow: '0 0 0 1px rgba(1, 66, 192, 0.1)',
	// border: `1px solid ${palette.primary100}`,

	// ':hover': {
	// 	borderColor: palette.primary100,
	// },

	':focus-within': {
		borderColor: palette.primary,
		// boxShadow: `0 0 0 3px ${palette.primary50}`,
	},
});

export const iconWrapper = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '32px',
	height: '100%',
	flexShrink: 0,
	color: palette.gray300,
});

export const input = style({
	flex: 1,
	height: '100%',
	padding: '0 4px',
	border: 'none',
	background: 'none',
	outline: 'none',
	fontSize: '14px',
	color: palette.primary400,

	'::placeholder': {
		color: palette.gray300,
	},
});

export const clearButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '24px',
	height: '24px',
	padding: 0,
	border: 'none',
	borderRadius: '12px',
	background: 'transparent',
	color: palette.gray300,
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: palette.primary50,
		color: palette.primary200,
	},
});
