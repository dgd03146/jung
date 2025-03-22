import { style } from '@vanilla-extract/css';
import { createVar } from '@vanilla-extract/css';

export const backgroundColor = createVar();

export const statsSection = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
	gap: '1rem',
});

export const statCard = style({
	background: 'white',
	borderRadius: '12px',
	padding: '1.25rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	border: '1px solid #f1f5f9',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
});

export const mainSection = style({
	background: 'white',
	borderRadius: '16px',
	border: '1px solid #f1f5f9',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
	overflow: 'hidden',
});

export const listViewItem = style({
	backgroundColor: backgroundColor,
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	marginBottom: '12px',
	overflow: 'hidden',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#e2e8f0',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
	},
});

export const actionButton = style({
	padding: '8px',
	background: 'transparent',
	border: '1px solid transparent',
	borderRadius: '8px',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '32px',
	height: '32px',
	color: '#94a3b8',

	':hover': {
		background: '#f8fafc',
		borderColor: '#e2e8f0',
	},

	selectors: {
		'&[data-variant="approve"]:hover': {
			background: '#f0fdf4',
			borderColor: '#86efac',
			color: '#22c55e',
		},
		'&[data-variant="reject"]:hover': {
			background: '#fef2f2',
			borderColor: '#fca5a5',
			color: '#ef4444',
		},
		'&[data-variant="delete"]:hover': {
			background: '#f8fafc',
			borderColor: '#e2e8f0',
			color: '#64748b',
		},
	},
});

export const actionIcon = style({
	width: '16px',
	height: '16px',
	color: 'inherit',
});

export const gridView = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
	gap: '1rem',
	padding: '1.5rem',
});

export const gridViewItem = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	overflow: 'hidden',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#e2e8f0',
		transform: 'translateY(-2px)',
		boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
	},
});

export const headerContainer = style({
	borderBottomWidth: '1px',
});

export const image = style({
	objectFit: 'cover',
});
