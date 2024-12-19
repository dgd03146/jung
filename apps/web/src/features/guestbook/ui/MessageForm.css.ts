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

export const loginContent = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	alignItems: 'center',
});

globalStyle(`${loginContent} h3`, {
	fontSize: '1.5rem',
	fontWeight: '600',
	color: '#1f2937',
	marginBottom: '0.5rem',
});

globalStyle(`${loginContent} p`, {
	color: '#6b7280',
	marginBottom: '1.5rem',
	fontFamily: "'Inter', sans-serif",
});

export const userInfo = style({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	marginBottom: '1.5rem',
});

globalStyle(`${userInfo} span`, {
	fontSize: '0.95rem',
	color: '#4b5563',
	fontWeight: '500',
	fontFamily: "'Inter', sans-serif",
});

export const avatar = style({
	width: '36px',
	height: '36px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: '2px solid #e5e7eb',
});

export const textarea = recipe({
	base: {
		width: '100%',
		padding: '1rem',
		borderRadius: '12px',
		border: '1px solid #e5e7eb',
		resize: 'none',
		fontSize: '1rem',
		lineHeight: '1.6',
		fontFamily: "'Inter', sans-serif",
		transition: 'all 0.2s ease',
		marginBottom: '1rem',

		':focus': {
			outline: 'none',
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

export const formFooter = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-end',
	flexWrap: 'wrap',
	gap: '1rem',
});

export const emojiPicker = style({
	display: 'flex',
	gap: '0.5rem',
	flexWrap: 'wrap',
});

export const emojiButton = style({
	padding: '8px',
	borderRadius: '12px',
	backgroundColor: '#f3f4f6',
	cursor: 'pointer',
	border: 'none',
	transition: 'all 0.2s ease',
	fontSize: '1.2rem',

	':hover': {
		backgroundColor: '#e5e7eb',
		transform: 'scale(1.1)',
	},

	':focus': {
		outline: 'none',
		backgroundColor: '#e5e7eb',
	},
});

export const emojiButtonSelected = style({
	backgroundColor: PRIMARY_COLOR,
	color: 'white',

	':hover': {
		backgroundColor: PRIMARY_HOVER,
	},
});

export const submitButton = style({
	padding: '0.75rem 1.5rem',
	borderRadius: '12px',
	border: 'none',
	background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_HOVER} 100%)`,
	color: 'white',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	fontSize: '0.95rem',
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	boxShadow: '0 2px 4px rgba(1, 66, 192, 0.1)',

	':hover': {
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 8px rgba(1, 66, 192, 0.2)',
		background: `linear-gradient(135deg, ${PRIMARY_HOVER} 0%, ${PRIMARY_COLOR} 100%)`,
	},

	':active': {
		transform: 'translateY(0)',
		boxShadow: '0 1px 2px rgba(1, 66, 192, 0.2)',
	},

	':disabled': {
		background: '#E5E7EB',
		color: '#9CA3AF',
		cursor: 'not-allowed',
		transform: 'none',
		boxShadow: 'none',
	},

	':focus': {
		outline: 'none',
		boxShadow: `0 0 0 3px ${PRIMARY_COLOR}30`,
	},
});

export const optionsContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
});

export const colorPicker = style({
	display: 'flex',
	gap: '0.5rem',
	flexWrap: 'wrap',
});

export const colorButton = style({
	width: '32px',
	height: '32px',
	borderRadius: '8px',
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
