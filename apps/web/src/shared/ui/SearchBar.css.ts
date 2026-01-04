import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const searchWrapper = style({
	position: 'relative',
	width: '100%',

	display: 'flex',
	alignItems: 'center',
	background: 'white',
	height: '40px',
	borderRadius: '8px',

	transition: 'all 0.2s ease',

	border: `1px solid ${palette.primary100}`,

	':focus-within': {
		boxShadow: `0 0 0 3px ${palette.primary50}`,
		borderColor: palette.primary,
	},
});

export const input = style({
	flex: 1,
	height: '100%',
	padding: '0 4px',
	border: 'none',
	background: 'none',
	outline: 'none',
	fontSize: '14px',
	color: palette.primary300,
	caretColor: palette.primary,

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
