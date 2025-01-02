import { style } from '@vanilla-extract/css';
import { createVar } from '@vanilla-extract/css';

export const backgroundColor = createVar();

export const pageWrapper = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
});

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

export const statValue = style({
	fontSize: '1.5rem',
	fontWeight: '600',
	color: '#0142C0',
});

export const statLabel = style({
	fontSize: '0.875rem',
	color: '#64748b',
});

export const mainSection = style({
	background: 'white',
	borderRadius: '16px',
	border: '1px solid #f1f5f9',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
	overflow: 'hidden',
});

export const header = style({
	padding: '20px 24px',
	borderBottom: '1px solid #f1f5f9',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const title = style({
	fontSize: '1.125rem',
	fontWeight: '600',
	color: '#0142C0',
	letterSpacing: '-0.025em',
});

export const viewToggle = style({
	display: 'flex',
	gap: '0.5rem',
	padding: '4px',
	background: '#f1f5f9',
	borderRadius: '8px',
});

export const viewToggleButton = style({
	padding: '8px',
	background: 'none',
	border: 'none',
	borderRadius: '6px',
	cursor: 'pointer',
	color: '#64748b',
	transition: 'all 0.2s ease',

	selectors: {
		'&[data-active="true"]': {
			background: 'white',
			color: '#0142C0',
			boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
		},
	},

	':hover': {
		color: '#0142C0',
	},
});

export const listView = style({
	padding: '1.5rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const listViewContent = style({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	padding: '0 1rem',
});

export const dragHandle = style({
	cursor: 'grab',
	color: '#94a3b8',
	fontSize: '1.25rem',
	userSelect: 'none',

	':hover': {
		color: '#64748b',
	},
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

export const messageMain = style({
	flex: 1,
	padding: '16px',
});

export const authorSection = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	marginBottom: '8px',
});

export const avatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	objectFit: 'cover',
});

export const authorName = style({
	fontWeight: '600',
	color: '#1e293b',
});

export const messageDate = style({
	color: '#64748b',
	fontSize: '0.875rem',
});

export const messageContent = style({
	color: '#334155',
	fontSize: '0.9375rem',
	lineHeight: '1.5',
});

export const emoji = style({
	marginRight: '8px',
	fontSize: '1.25rem',
});

export const actions = style({
	display: 'flex',
	gap: '8px',
	padding: '12px 16px',
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
