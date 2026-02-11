import { mediaQueries, palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const slideDown = keyframes({
	from: { opacity: 0, transform: 'translateY(-8px) scale(0.98)' },
	to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	zIndex: 50,
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	backdropFilter: 'blur(4px)',
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'center',
	paddingTop: '15vh',
	animation: `${fadeIn} 0.15s ease-out`,
});

export const container = style({
	width: '100%',
	maxWidth: '600px',
	margin: '0 16px',
	backgroundColor: 'white',
	borderRadius: '12px',
	boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
	overflow: 'hidden',
	animation: `${slideDown} 0.2s ease-out`,

	'@media': {
		[mediaQueries.tablet]: {
			margin: '0 12px',
			maxWidth: '100%',
		},
	},
});

export const inputWrapper = style({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	padding: '14px 16px',
	borderBottom: `1px solid ${palette.primary50}`,
});

export const searchIcon = style({
	flexShrink: 0,
	color: palette.primary200,
	fontSize: '18px',
});

export const input = style({
	flex: 1,
	border: 'none',
	outline: 'none',
	fontSize: '15px',
	color: palette.primary,
	backgroundColor: 'transparent',

	'::placeholder': {
		color: palette.primary100,
	},
});

export const shortcutHint = style({
	flexShrink: 0,
	fontSize: '11px',
	color: palette.primary200,
	padding: '2px 6px',
	borderRadius: '4px',
	border: `1px solid ${palette.primary50}`,
	fontFamily: 'system-ui, sans-serif',
});

export const tabs = style({
	display: 'flex',
	gap: '0',
	padding: '0 16px',
	borderBottom: `1px solid ${palette.primary50}`,
});

export const tab = recipe({
	base: {
		padding: '8px 12px',
		fontSize: '13px',
		fontWeight: 500,
		color: palette.primary200,
		cursor: 'pointer',
		border: 'none',
		backgroundColor: 'transparent',
		borderBottom: '2px solid transparent',
		transition: 'all 0.15s ease',
	},
	variants: {
		active: {
			true: {
				color: palette.primary,
				borderBottomColor: palette.primary,
			},
			false: {
				selectors: {
					'&:hover': {
						color: palette.primary300,
					},
				},
			},
		},
	},
	defaultVariants: {
		active: false,
	},
});

export const results = style({
	maxHeight: '400px',
	overflowY: 'auto',
	padding: '8px',
});

export const emptyState = style({
	padding: '32px 16px',
	textAlign: 'center',
	color: palette.primary200,
	fontSize: '14px',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '8px 16px',
	borderTop: `1px solid ${palette.primary50}`,
	fontSize: '11px',
	color: palette.primary200,
});

export const footerKeys = style({
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
});

export const kbd = style({
	padding: '1px 5px',
	borderRadius: '3px',
	border: `1px solid ${palette.primary100}`,
	backgroundColor: palette.primary50,
	fontSize: '11px',
	fontFamily: 'system-ui, sans-serif',
});

export const loadingDot = keyframes({
	'0%, 80%, 100%': { opacity: 0.3 },
	'40%': { opacity: 1 },
});

export const loading = style({
	padding: '24px 16px',
	textAlign: 'center',
	color: palette.primary200,
	fontSize: '14px',
});

export const dot = style({
	display: 'inline-block',
	animation: `${loadingDot} 1.4s infinite ease-in-out`,
	selectors: {
		'&:nth-child(2)': { animationDelay: '0.2s' },
		'&:nth-child(3)': { animationDelay: '0.4s' },
	},
});
