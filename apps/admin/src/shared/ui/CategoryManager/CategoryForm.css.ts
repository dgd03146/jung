import { style } from '@vanilla-extract/css';

export const formGroup = style({
	marginBottom: '28px',
	transition: 'all 0.2s ease',
	position: 'relative',
	minHeight: '82px',
});

export const formLabel = style({
	display: 'block',
	fontSize: '14px',
	fontWeight: '600',
	color: '#475569',
	marginBottom: '10px',
	letterSpacing: '0.01em',
});

export const textarea = style({
	width: '100%',
	padding: '12px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#1e293b',

	minHeight: '100px',
	transition: 'all 0.2s ease',
	resize: 'none',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const errorMessage = style({
	color: '#dc2626',
	fontSize: '13px',
	marginTop: '4px',
	position: 'absolute',
	bottom: '-20px',
	left: 0,
});

export const colorInput = style({
	width: '100%',
	height: '40px',
	padding: '4px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	cursor: 'pointer',
	background: 'white',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#cbd5e1',
	},

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const modalActions = style({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '12px',
	marginTop: '24px',
	borderTop: '1px solid #f1f5f9',
	paddingTop: '24px',
});

export const cancelButton = style({
	padding: '0 20px',
	height: '40px',
	background: '#f1f5f9',
	color: '#64748b',
	border: 'none',
	borderRadius: '8px',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#e2e8f0',
	},
});

export const saveButton = style({
	padding: '0 20px',
	height: '40px',
	background: '#0142C0',
	color: 'white',
	border: 'none',
	borderRadius: '8px',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#0031A0',
	},
});

export const inputError = style({
	borderColor: 'red',
	':focus': {
		borderColor: 'red',
	},
});

export const input = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#1e293b',
	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const modalOverlay = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0, 0, 0, 0.5)',
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
});

export const modalTitle = style({
	fontSize: '20px',
	fontWeight: '600',
	color: '#0f172a',
	marginBottom: '24px',
});
