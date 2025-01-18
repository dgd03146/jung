import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const PRIMARY_COLOR = '#0142C0';
const PRIMARY_HOVER = '#0136A3';

export const form = style({
	maxWidth: '600px',
	margin: '0 auto 2rem',
	padding: '2rem',
	backgroundColor: 'white',
	borderRadius: '16px',
	boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
});

export const loginContainer = style({
	maxWidth: '600px',
	margin: '0 auto 2rem',
	padding: '2rem 1rem',
	backgroundColor: 'white',
	borderRadius: '16px',
	boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
	textAlign: 'center',
});

export const userInfo = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
	marginBottom: '1.5rem',
	padding: '0.5rem',
	borderRadius: '8px',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: '#f8f9fa',
	},
});

export const avatar = style({
	width: '28px',
	height: '28px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: '1px solid #0142C0',
});

globalStyle(`${userInfo} span`, {
	fontSize: '0.875rem',
	color: '#1f2937',
	fontWeight: '500',
	fontFamily: "'Inter', sans-serif",
});

export const submitButtonWrapper = style({
	position: 'absolute',
	bottom: '0.75rem',
	right: '0.75rem',
});

export const textarea = recipe({
	base: {
		width: '100%',
		padding: '1rem',
		paddingRight: '7rem',
		borderRadius: '12px',
		border: '1px solid #e5e7eb',
		resize: 'none',
		fontSize: '1rem',
		lineHeight: '1.6',
		fontFamily: "'Inter', sans-serif",
		transition: 'all 0.2s ease',
		marginBottom: '0',

		':focus': {
			outline: 'none',
			borderColor: PRIMARY_COLOR,
		},

		'::placeholder': {
			color: '#9ca3af',
		},
	},
	variants: {
		backgroundColor: {
			'#FFFFFF': { backgroundColor: '#FFFFFF' },
			'#FFF3E0': { backgroundColor: '#FFF3E0' },
			'#E8F5E9': { backgroundColor: '#E8F5E9' },
			'#E3F2FD': { backgroundColor: '#E3F2FD' },
			'#F3E5F5': { backgroundColor: '#F3E5F5' },
			'#FFF8E1': { backgroundColor: '#FFF8E1' },
			'#E0F7FA': { backgroundColor: '#E0F7FA' },
		},
	},
	defaultVariants: {
		backgroundColor: '#FFF3E0',
	},
});

export const emojiButton = style({
	padding: '8px',
	borderRadius: '8px',
	backgroundColor: '#f3f4f6',
	cursor: 'pointer',
	border: 'none',
	transition: 'all 0.2s ease',
	fontSize: '1rem',

	':hover': {
		backgroundColor: '#e5e7eb',
		transform: 'scale(1.1)',
	},

	':focus': {
		outline: 'none',
		backgroundColor: PRIMARY_COLOR,
	},
});

export const emojiButtonSelected = style({
	backgroundColor: PRIMARY_COLOR,
	color: 'white',

	':hover': {
		backgroundColor: PRIMARY_HOVER,
	},
});

export const colorButton = style({
	width: '24px',
	height: '24px',
	borderRadius: '4px',
	border: '2px solid #e5e7eb',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	padding: 0,

	':hover': {
		transform: 'scale(1.1)',
	},

	':focus': {
		outline: 'none',
		boxShadow: `0 0 0 2px ${PRIMARY_COLOR}40`,
	},

	selectors: {
		'&[style*="background-color: #FFFFFF"]': {
			border: '2px solid #d1d5db',
		},
		'&[style*="background-color: #FFFFFF"]:hover': {
			border: '2px solid #9ca3af',
		},
	},
});

export const colorButtonSelected = style({
	border: `2px solid ${PRIMARY_COLOR} !important`,
	transform: 'scale(1.1)',
});
