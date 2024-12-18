import { globalStyle, style } from '@vanilla-extract/css';

const PRIMARY_COLOR = '#0142C0';
const PRIMARY_HOVER = '#0136A3';

export const form = style({
	maxWidth: '600px',
	margin: '0 auto 2rem',
	padding: '2rem',
	backgroundColor: 'white',
	borderRadius: '16px',
	boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
	transition: 'transform 0.2s ease',
	':hover': {
		transform: 'translateY(-2px)',
	},
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

export const textarea = style({
	width: '100%',
	padding: '1rem',
	borderRadius: '12px',
	border: '1px solid #e5e7eb',
	resize: 'none',
	fontSize: '1rem',
	lineHeight: '1.6',
	fontFamily: "'Inter', sans-serif",
	transition: 'border-color 0.2s ease',
	marginBottom: '1rem',
	backgroundColor: '#f9fafb',

	':focus': {
		outline: 'none',
		borderColor: PRIMARY_COLOR,
		backgroundColor: 'white',
	},

	'::placeholder': {
		color: '#9ca3af',
	},
});

export const formFooter = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
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
	backgroundColor: PRIMARY_COLOR,
	color: 'white',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	fontFamily: "'Inter', sans-serif",

	':hover': {
		backgroundColor: PRIMARY_HOVER,
		transform: 'translateY(-1px)',
	},

	':disabled': {
		backgroundColor: '#e5e7eb',
		cursor: 'not-allowed',
		transform: 'none',
	},

	':focus': {
		outline: 'none',
		boxShadow: `0 0 0 3px ${PRIMARY_COLOR}40`,
	},
});
