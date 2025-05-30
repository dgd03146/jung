import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const flexBasis = style({
	flexBasis: '2/5',
});

export const inputError = style({
	borderColor: 'red',
});

export const selectWrapper = style({
	position: 'relative',

	':after': {
		content: '""',
		position: 'absolute',
		right: '12px',
		top: '50%',

		width: '10px',
		height: '10px',
		borderRight: '2px solid #64748b',
		borderBottom: '2px solid #64748b',
		transform: 'translateY(-50%) rotate(45deg)',
		pointerEvents: 'none',
	},
});

export const select = style({
	width: '100%',
	height: '40px',
	padding: '0 32px 0 12px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#1e293b',
	backgroundColor: 'white',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	appearance: 'none',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},

	':hover': {
		borderColor: '#cbd5e1',
	},
});

export const required = style({
	color: 'red',
});

export const imagePreviewContainer = style({
	transition: 'all 0.2s ease',
	borderStyle: 'dashed',
	borderWidth: '1px',
	borderColor: palette.gray,
	aspectRatio: '16/9',

	':hover': {
		borderColor: palette.primary,
	},
});

export const imagePreview = style({
	objectFit: 'cover',
});
