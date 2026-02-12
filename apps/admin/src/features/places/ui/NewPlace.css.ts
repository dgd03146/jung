import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import {
	darkText,
	inputBorder,
	inputBorderHover,
	mutedText,
} from '@/fsd/shared/styles/tokens';

export const selectWrapper = style({
	position: 'relative',

	':after': {
		content: '""',
		position: 'absolute',
		right: '12px',
		top: '50%',
		width: '10px',
		height: '10px',
		borderRight: `2px solid ${mutedText}`,
		borderBottom: `2px solid ${mutedText}`,
		transform: 'translateY(-50%) rotate(45deg)',
		pointerEvents: 'none',
	},
});

export const select = style({
	width: '100%',
	height: '40px',
	padding: '0 32px 0 12px',
	border: `1px solid ${inputBorder}`,
	borderRadius: '8px',
	fontSize: '14px',
	color: darkText,
	backgroundColor: 'white',
	cursor: 'pointer',
	transition: 'border-color 0.15s ease',
	appearance: 'none',

	':focus': {
		outline: 'none',
		borderColor: palette.primary,
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},

	':hover': {
		borderColor: inputBorderHover,
	},
});

export const basicInfoContainer = style({
	flexBasis: '40%',
});
