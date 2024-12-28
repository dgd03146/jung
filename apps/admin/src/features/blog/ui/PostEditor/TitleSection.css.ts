import { style } from '@vanilla-extract/css';

export const titleSection = style({
	marginBottom: '20px',

	padding: '20px 0',

	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	borderBottom: '1px solid rgba(55, 53, 47, 0.09)',
});

export const titleInput = style({
	width: '100%',
	fontSize: '40px',
	fontWeight: '700',
	color: '#37352F',
	border: 'none',
	outline: 'none',
	// padding: '8px 0',
	marginBottom: '8px',
	background: 'transparent',
	caretColor: '#0142C0',
	fontFamily: 'inherit',
	lineHeight: '1.2',

	'::placeholder': {
		color: '#9BA1A6',
	},

	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '32px',
		},
	},
});

export const descriptionInput = style({
	width: '100%',
	fontSize: '16px',
	color: '#787774',
	border: 'none',
	outline: 'none',
	// padding: '8px 0',

	background: 'transparent',
	caretColor: '#0142C0',
	fontFamily: 'inherit',
	lineHeight: '1.5',

	'::placeholder': {
		color: '#9BA1A6',
	},

	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '14px',
		},
	},
});

export const metaSection = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const metaRow = style({
	display: 'flex',

	gap: '8px',
});

export const label = style({
	minWidth: '100px',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	fontSize: '14px',
	color: '#0142C0',
	fontWeight: '600',

	'@media': {
		'screen and (max-width: 768px)': {
			minWidth: '80px',
			fontSize: '13px',
		},
	},
});

export const fieldContainer = style({
	flex: 1,
	position: 'relative',
});

export const tagInputContainer = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '6px',
	padding: '0 12px',
	borderRadius: '6px',
	width: '100%',

	minHeight: '40px',
	alignItems: 'center',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#0142C0',
		backgroundColor: '#F8FAFC',
	},

	':focus-within': {
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},
});

export const inlineTagInput = style({
	border: 'none',
	outline: 'none',
	padding: '0',
	margin: '0',
	fontSize: '14px',
	backgroundColor: 'transparent',
	color: '#37352F',
	flex: '1',
	minWidth: '60px',

	'::placeholder': {
		color: '#94A3B8',
	},
});

export const tag = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '6px',
	height: '28px',
	padding: '0 10px',
	backgroundColor: '#EEF2FF',
	color: '#0142C0',
	borderRadius: '6px',
	fontSize: '13px',
	fontWeight: '500',
	userSelect: 'none',
	border: '1px solid #E6EDFF',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: '#F0F4FF',
		borderColor: '#0142C0',
	},
});

export const errorMessage = style({
	fontSize: '13px',
	color: '#E11D48',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	marginTop: '4px',
	marginBottom: '12px',

	// padding: '4px 8px',
});

export const iconWrapper = style({
	display: 'flex',
	alignItems: 'center',
	color: '#0142C0',
});

export const inputWrapper = style({
	position: 'relative',
	marginBottom: '8px',
});

export const removeTag = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: 'none',
	background: 'none',
	color: '#0142C0',
	cursor: 'pointer',
	padding: '0 2px',
	fontSize: '14px',
	opacity: 0.8,
	width: '16px',
	height: '16px',
	borderRadius: '50%',

	':hover': {
		opacity: 1,
		backgroundColor: 'rgba(1, 66, 192, 0.08)',
	},
});

export const tagRow = style({
	display: 'flex',
	flexDirection: 'column',

	gap: '12px',
});

export const selectWrapper = style({
	position: 'relative',
	width: '100%',
});

export const select = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	fontSize: '14px',
	color: '#37352F',
	backgroundColor: 'white',
	// border: '1px solid #E6EDFF',
	borderRadius: '6px',
	outline: 'none',
	cursor: 'pointer',
	appearance: 'none',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#0142C0',
		backgroundColor: '#F8FAFC',
	},

	':focus': {
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},

	'::placeholder': {
		color: '#94A3B8',
	},
});
