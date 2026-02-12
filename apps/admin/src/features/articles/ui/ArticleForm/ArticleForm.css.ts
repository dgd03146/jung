import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const inputBorder = 'rgba(0, 0, 0, 0.1)';
const inputBorderHover = 'rgba(0, 0, 0, 0.15)';
const mutedText = 'rgba(0, 0, 0, 0.45)';
const darkText = 'rgba(0, 0, 0, 0.85)';

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

export const formContainer = style({
	maxWidth: '800px',
	margin: '0 auto',
});

export const improveButton = style({
	backgroundColor: palette.primary,
	border: 'none',
	color: 'white',
	transition: 'opacity 0.15s ease',

	':hover': {
		opacity: 0.85,
	},

	':disabled': {
		opacity: 0.5,
		cursor: 'not-allowed',
	},
});

export const publishButton = style({
	backgroundColor: palette.primary,
	border: 'none',
	color: 'white',
	transition: 'opacity 0.15s ease',

	':hover': {
		opacity: 0.85,
	},

	':disabled': {
		opacity: 0.5,
		cursor: 'not-allowed',
	},
});

export const imageGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gap: '12px',
});

export const imagePreview = style({
	position: 'relative',
	aspectRatio: '16 / 9',
	borderRadius: '8px',
	overflow: 'hidden',
	border: `1px solid ${inputBorder}`,
});

export const imagePreviewImg = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});

export const imageRemoveButton = style({
	position: 'absolute',
	top: '6px',
	right: '6px',
	width: '24px',
	height: '24px',
	borderRadius: '50%',
	border: 'none',
	background: 'rgba(0, 0, 0, 0.6)',
	color: 'white',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'background 0.15s ease',

	':hover': {
		background: 'rgba(239, 68, 68, 0.9)',
	},
});

export const fileInput = style({
	display: 'none',
});
