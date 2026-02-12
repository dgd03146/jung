import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import {
	darkText,
	inputBorder,
	inputBorderHover,
	overlay,
	primaryRing,
} from '@/fsd/shared/styles/tokens';

export const colorInput = style({
	width: '100%',
	height: '40px',
	padding: '4px',
	border: `1px solid ${inputBorder}`,
	borderRadius: '8px',
	cursor: 'pointer',
	background: 'white',
	transition: 'border-color 0.15s ease',

	':hover': {
		borderColor: inputBorderHover,
	},

	':focus': {
		outline: 'none',
		borderColor: palette.primary,
		boxShadow: `0 0 0 2px ${primaryRing}`,
	},
});

export const input = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	border: `1px solid ${inputBorder}`,
	borderRadius: '8px',
	fontSize: '14px',
	color: darkText,
	transition: 'border-color 0.15s ease',

	':focus': {
		outline: 'none',
		borderColor: palette.primary,
		boxShadow: `0 0 0 2px ${primaryRing}`,
	},
});

export const modalOverlay = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: overlay,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '24px',
	zIndex: 1000,
});

export const modalContent = style({
	background: 'white',
	borderRadius: '16px',
	padding: '24px',
	width: '100%',
	maxWidth: '500px',
	maxHeight: 'calc(100dvh - 48px)',
	overflow: 'auto',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
});
