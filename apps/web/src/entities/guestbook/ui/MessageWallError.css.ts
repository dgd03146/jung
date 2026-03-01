import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	minHeight: '240px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '2rem 1.5rem',
	background: '#FAFBFC',
	borderRadius: '12px',
	border: '1px solid #E2E8F0',
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.75rem',
	textAlign: 'center',
	maxWidth: '320px',
});

export const iconWrapper = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '44px',
	height: '44px',
	borderRadius: '50%',
	backgroundColor: '#FEF2F2',
	color: '#EF4444',
});

export const title = style({
	fontSize: '1rem',
	fontWeight: 600,
	color: '#1E293B',
	letterSpacing: '-0.01em',
});

export const description = style({
	fontSize: '0.8125rem',
	color: '#64748B',
	lineHeight: 1.5,
});

export const errorMessage = style({
	fontSize: '0.75rem',
	color: '#94A3B8',
	maxWidth: '280px',
	wordBreak: 'break-word',
	padding: '0.5rem 0.75rem',
	backgroundColor: '#F1F5F9',
	borderRadius: '6px',
});

export const refreshButton = style({
	marginTop: '0.25rem',
	padding: '0.5rem 1.25rem',
	border: 'none',
	borderRadius: '6px',
	color: 'white',
	backgroundColor: palette.primary,
	fontSize: '0.8125rem',
	fontWeight: 500,
	cursor: 'pointer',
	transition:
		'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',

	':hover': {
		backgroundColor: '#0136A3',
	},

	':active': {
		transform: 'scale(0.98)',
	},

	':focus': {
		outline: 'none',
		boxShadow: `0 0 0 2px ${palette.primary}40`,
	},
});
