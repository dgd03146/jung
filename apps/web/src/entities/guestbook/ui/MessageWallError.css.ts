import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

export const container = style({
	width: '100%',
	minHeight: '400px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '2rem',
	background: '#FAFAFA',
	borderRadius: '24px',
	border: '1px dashed #E0E0E0',
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '1rem',
	textAlign: 'center',
	maxWidth: '400px',
	padding: '2rem',
	animation: `${fadeIn} 0.5s ease-out`,
});

export const iconWrapper = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '64px',
	height: '64px',
	borderRadius: '50%',
	backgroundColor: '#FEE2E2',
	color: '#EF4444',
	marginBottom: '0.5rem',
	transition: 'all 0.2s ease',
});

export const title = style({
	fontSize: '1.5rem',
	fontWeight: '600',
	color: '#2C2C2C',
	marginBottom: '0.25rem',
	letterSpacing: '-0.02em',
	fontFamily: "'Pretendard Variable', sans-serif",
});

export const description = style({
	fontSize: '1rem',
	marginBottom: '0.5rem',
	lineHeight: '1.5',
	letterSpacing: '-0.01em',
});

export const errorMessage = style({
	fontSize: '0.875rem',
	color: '#6B7280',
	maxWidth: '300px',
	wordBreak: 'break-word',
	padding: '0.75rem',
	backgroundColor: '#F9FAFB',
	borderRadius: '8px',
});

export const refreshButton = style({
	marginTop: '1.5rem',
	padding: '0.75rem 2rem',

	border: '1px solid #E5E7EB',
	borderRadius: '12px',
	color: '#0142C0',
	backgroundColor: 'white',

	fontSize: '1rem',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

	':hover': {
		backgroundColor: '#0136A3',
		color: 'white',
		transform: 'translateY(-1px)',
	},

	':active': {
		backgroundColor: '#F3F4F6',
		transform: 'translateY(0)',
	},

	':focus': {
		outline: 'none',
		boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.1)',
	},
});
