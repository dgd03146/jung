import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const form = style({
	padding: '0.75rem',
	backgroundColor: 'white',
	borderRadius: '12px',
	boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
});

export const textarea = recipe({
	base: {
		width: '100%',
		padding: '12px 14px',
		borderRadius: '6px',
		border: '1px solid #E2E8F0',
		resize: 'none',
		fontSize: '14px',

		transition: 'all 0.2s ease-in-out',
		marginBottom: '0',
		backgroundColor: '#F8FAFC',

		color: '#334155',

		':hover': {
			borderColor: '#CBD5E1',
		},

		':focus': {
			outline: 'none',
			borderColor: '#94A3B8',

			boxShadow: '0 2px 8px rgba(148, 163, 184, 0.15)',
		},

		'::placeholder': {
			color: '#94A3B8',
			fontSize: '14px',
		},

		'::-webkit-scrollbar': {
			width: '6px',
		},

		'::-webkit-scrollbar-track': {
			background: 'transparent',
		},

		'::-webkit-scrollbar-thumb': {
			background: '#E2E8F0',
			borderRadius: '3px',
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
	padding: '6px',
	borderRadius: '6px',
	backgroundColor: '#f3f4f6',
	cursor: 'pointer',
	border: 'none',
	transition: 'all 0.2s ease',
	fontSize: '1rem',

	':hover': {
		backgroundColor: '#e5e7eb',
		transform: 'scale(1.05)',
	},

	':focus': {
		outline: 'none',
		backgroundColor: palette.primary,
	},
});

export const emojiButtonSelected = style({
	backgroundColor: palette.primary,
	color: 'white',

	':hover': {
		backgroundColor: '#0136A3',
	},
});

export const colorButton = style({
	width: '22px',
	height: '22px',
	borderRadius: '3px',
	border: '1.5px solid #e5e7eb',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	padding: 0,

	':hover': {
		transform: 'scale(1.1)',
	},

	':focus': {
		outline: 'none',
		boxShadow: `0 0 0 2px ${palette.primary}40`,
	},

	selectors: {
		'&[style*="background-color: #FFFFFF"]': {
			border: '1.5px solid #d1d5db',
		},
		'&[style*="background-color: #FFFFFF"]:hover': {
			border: '1.5px solid #9ca3af',
		},
	},
});

export const colorButtonSelected = style({
	border: `1.5px solid ${palette.primary} !important`,
	transform: 'scale(1.1)',
});

export const disabled = style({
	opacity: 0.6,
	cursor: 'not-allowed',
});

export const nicknameInput = style({
	width: '100%',
	padding: '9px 11px',
	borderRadius: '6px',
	border: '1px solid #E2E8F0',
	fontSize: '14px',
	backgroundColor: '#F8FAFC',
	color: '#334155',
	transition: 'all 0.2s ease-in-out',

	':hover': {
		borderColor: '#CBD5E1',
	},

	':focus': {
		outline: 'none',
		borderColor: '#94A3B8',
		boxShadow: '0 2px 8px rgba(148, 163, 184, 0.15)',
	},

	'::placeholder': {
		color: '#94A3B8',
		fontSize: '14px',
	},
});

export const anonymousLabel = style({
	fontSize: '12px',
	color: '#64748B',
	fontWeight: 500,
});

export const socialIconButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '28px',
	height: '28px',
	borderRadius: '6px',
	border: '1px solid #E2E8F0',
	backgroundColor: '#F8FAFC',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	padding: 0,

	':hover': {
		backgroundColor: '#EDF2F7',
		borderColor: '#CBD5E1',
	},
});

export const postButton = style({
	backgroundColor: palette.primary,
	color: 'white',
	border: 'none',
	padding: '6px 14px',
	borderRadius: '6px',
	fontSize: '13px',
	fontWeight: 500,
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	flexShrink: 0,

	':hover': {
		backgroundColor: '#0136A3',
	},

	':disabled': {
		opacity: 0.5,
		cursor: 'not-allowed',
	},
});
