import { keyframes, style } from '@vanilla-extract/css';

const _fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.2)',
	backdropFilter: 'blur(4px)',
	zIndex: 999,

	'@media': {
		'(min-width: 769px)': {
			display: 'none',
		},
	},
});

export const container = style({
	position: 'fixed',
	bottom: '92px',
	right: '24px',
	width: '370px',
	height: '520px',
	background: 'rgba(255, 255, 255, 0.88)',
	backdropFilter: 'blur(24px)',
	borderRadius: '20px',
	boxShadow:
		'0 8px 32px rgba(77, 102, 229, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
	border: '1px solid rgba(77, 102, 229, 0.1)',
	zIndex: 1000,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',

	'@media': {
		'(max-width: 768px)': {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			width: '100%',
			height: '100%',
			borderRadius: 0,
			background: 'rgba(255, 255, 255, 0.95)',
		},
	},
});

export const header = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '16px 20px',
	borderBottom: '1px solid rgba(77, 102, 229, 0.08)',
});

export const headerTitle = style({
	fontSize: '15px',
	fontWeight: 600,
	color: '#1F2937',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
});

export const closeButton = style({
	background: 'rgba(77, 102, 229, 0.06)',
	border: 'none',
	color: '#6B7280',
	cursor: 'pointer',
	padding: '6px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '8px',
	transition: 'all 0.15s',

	':hover': {
		backgroundColor: 'rgba(77, 102, 229, 0.12)',
		color: '#4D66E5',
	},
});

export const messagesContainer = style({
	flex: 1,
	overflowY: 'auto',
	padding: '16px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',

	'::-webkit-scrollbar': {
		width: '6px',
	},
	'::-webkit-scrollbar-track': {
		background: 'transparent',
	},
	'::-webkit-scrollbar-thumb': {
		background: 'rgba(77, 102, 229, 0.2)',
		borderRadius: '3px',
	},
	selectors: {
		'&::-webkit-scrollbar-thumb:hover': {
			background: 'rgba(77, 102, 229, 0.35)',
		},
	},
});

export const inputContainer = style({
	padding: '12px 16px 16px',
	borderTop: '1px solid rgba(77, 102, 229, 0.08)',
	background: 'rgba(255, 255, 255, 0.5)',
});

export const inputWrapper = style({
	display: 'flex',
	gap: '10px',
	alignItems: 'flex-end',
});

export const textInput = style({
	flex: 1,
	padding: '12px 16px',
	border: '1px solid rgba(77, 102, 229, 0.12)',
	borderRadius: '14px',
	fontSize: '14px',
	outline: 'none',
	resize: 'none',
	minHeight: '44px',
	maxHeight: '120px',
	fontFamily: 'inherit',
	backgroundColor: 'rgba(255, 255, 255, 0.8)',
	color: '#1F2937',
	transition: 'all 0.15s',

	':focus': {
		borderColor: '#4D66E5',
		backgroundColor: '#fff',
		boxShadow: '0 0 0 3px rgba(77, 102, 229, 0.12)',
	},

	'::placeholder': {
		color: '#9CA3AF',
	},

	'::-webkit-scrollbar': {
		width: '4px',
	},
	'::-webkit-scrollbar-track': {
		background: 'transparent',
	},
	'::-webkit-scrollbar-thumb': {
		background: 'rgba(77, 102, 229, 0.2)',
		borderRadius: '2px',
	},
	selectors: {
		'&::-webkit-scrollbar-thumb:hover': {
			background: 'rgba(77, 102, 229, 0.35)',
		},
	},
});

export const sendButton = style({
	width: '44px',
	height: '44px',
	borderRadius: '14px',
	background: 'linear-gradient(135deg, #4D66E5 0%, #3B5BD9 100%)',
	color: '#fff',
	border: 'none',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'all 0.15s',
	flexShrink: 0,
	boxShadow: '0 2px 8px rgba(77, 102, 229, 0.3)',

	':hover': {
		transform: 'scale(1.05)',
		boxShadow: '0 4px 12px rgba(77, 102, 229, 0.4)',
	},

	':disabled': {
		backgroundColor: '#E5E7EB',
		boxShadow: 'none',
		cursor: 'not-allowed',
		transform: 'none',
	},
});

// Welcome Screen - Glassmorphism
export const welcomeScreen = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '32px 24px',
	textAlign: 'center',
});

export const blobAvatar = style({
	width: '72px',
	height: '72px',
	borderRadius: '50%',
	background: 'linear-gradient(135deg, #4D66E5 0%, #3B5BD9 100%)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginBottom: '20px',
	color: '#fff',
	boxShadow: '0 8px 24px rgba(77, 102, 229, 0.35)',
});

export const blobFace = style({
	fontSize: '28px',
});

export const welcomeTitle = style({
	fontSize: '20px',
	fontWeight: 600,
	color: '#1F2937',
	marginBottom: '8px',
	lineHeight: 1.3,
});

export const welcomeHighlight = style({
	color: '#4D66E5',
});

export const welcomeSubtitle = style({
	fontSize: '14px',
	color: '#6B7280',
	marginBottom: '28px',
	lineHeight: 1.5,
	maxWidth: '260px',
});

export const startButton = style({
	padding: '12px 32px',
	background: 'linear-gradient(135deg, #4D66E5 0%, #3B5BD9 100%)',
	color: '#fff',
	border: 'none',
	borderRadius: '12px',
	fontSize: '14px',
	fontWeight: 600,
	cursor: 'pointer',
	transition: 'all 0.2s',
	boxShadow: '0 4px 16px rgba(77, 102, 229, 0.35)',

	':hover': {
		transform: 'translateY(-2px)',
		boxShadow: '0 6px 20px rgba(77, 102, 229, 0.45)',
	},
});

// Quick Actions - Glass style
export const quickActionsContainer = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '8px',
	padding: '0 16px 12px',
});

export const quickActionButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '8px 14px',
	backgroundColor: 'rgba(255, 255, 255, 0.6)',
	border: '1px solid rgba(77, 102, 229, 0.1)',
	borderRadius: '10px',
	fontSize: '13px',
	fontWeight: 500,
	color: '#4B5563',
	cursor: 'pointer',
	transition: 'all 0.15s',
	backdropFilter: 'blur(8px)',

	':hover': {
		backgroundColor: 'rgba(77, 102, 229, 0.08)',
		borderColor: 'rgba(77, 102, 229, 0.2)',
		color: '#4D66E5',
	},
});

export const quickActionIcon = style({
	fontSize: '14px',
});
