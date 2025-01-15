import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	height: '100vh',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#f8fafc',
	padding: '2rem',
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
	textAlign: 'center',
	padding: '2rem',
	backgroundColor: '#ffffff',
	borderRadius: '8px',
	boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
});

export const errorMessage = style({
	fontSize: '1.25rem',
	fontWeight: '500',
	color: '#ef4444',
	lineHeight: '1.4',
});

export const errorDetail = style({
	fontSize: '1rem',
	color: '#64748b',
	lineHeight: '1.5',
});

export const retryButton = style({
	marginTop: '1rem',
	padding: '0.75rem 1.5rem',
	backgroundColor: '#0142C0',
	color: '#ffffff',
	borderRadius: '6px',
	fontWeight: '500',
	cursor: 'pointer',
	border: 'none',
	transition: 'background-color 0.2s',
	':hover': {
		backgroundColor: '#0039A6',
	},
	':active': {
		backgroundColor: '#003087',
	},
});
