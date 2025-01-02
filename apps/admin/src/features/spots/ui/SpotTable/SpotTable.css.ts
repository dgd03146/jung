import { style } from '@vanilla-extract/css';

export const tableAction = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '24px',
});

export const searchInput = style({
	padding: '8px 16px',
	border: '1px solid #e2e8f0',
	borderRadius: '6px',
	fontSize: '14px',
	width: '320px',
	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const newButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 16px',
	background: '#0142C0',
	color: 'white',
	border: 'none',
	borderRadius: '6px',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#0031A0',
	},
});

export const tableWrapper = style({
	background: 'white',
	borderRadius: '12px',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
	overflow: 'hidden',
});

export const table = style({
	width: '100%',
	borderCollapse: 'collapse',
});

export const th = style({
	padding: '12px 16px',
	textAlign: 'center',
	fontSize: '14px',
	fontWeight: '500',
	color: '#64748b',
	background: '#f8fafc',
	borderBottom: '1px solid #e2e8f0',
	position: 'relative',
});

export const row = style({
	':hover': {
		background: '#f8fafc',
	},
});

export const td = style({
	padding: '12px 16px',
	fontSize: '14px',
	borderBottom: '1px solid #e2e8f0',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	maxWidth: '200px',
	textAlign: 'center',
	verticalAlign: 'middle',
});

export const actionButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '32px',
	height: '32px',
	padding: '0',
	background: 'transparent',
	border: '1px solid #e2e8f0',
	borderRadius: '6px',
	color: '#64748b',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	selectors: {
		'&:hover': {
			background: '#f1f5f9',
			borderColor: '#cbd5e1',
			color: '#0142C0',
		},
		'&:has(svg[data-icon="trash"]):hover': {
			background: '#fee2e2',
			borderColor: '#fecaca',
			color: '#ef4444',
		},
	},
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	padding: '16px',
	borderTop: '1px solid #e2e8f0',
});

export const pagination = style({
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
});

export const pageButton = style({
	padding: '6px 12px',
	border: '1px solid #e2e8f0',
	borderRadius: '6px',
	background: 'transparent',
	color: '#64748b',
	fontSize: '14px',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#f1f5f9',
		borderColor: '#cbd5e1',
	},

	selectors: {
		'&[data-active="true"]': {
			background: '#0142C0',
			borderColor: '#0142C0',
			color: 'white',
		},
	},
});

export const categoryBadge = style({
	display: 'inline-flex',
	padding: '4px 8px',
	background: '#f1f5f9',
	borderRadius: '4px',
	fontSize: '12px',
	color: '#0142C0',
});

export const rating = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '4px',
	color: '#ff9500',
});

export const thumbnail = style({
	width: '60px',
	height: '40px',
	objectFit: 'cover',
	borderRadius: '4px',
});

export const tipItem = style({
	padding: '2px 4px',
	borderRadius: '4px',
	background: '#f8fafc',

	':hover': {
		background: '#f1f5f9',
	},
});

export const tipText = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	maxWidth: '200px',
});

export const textAlignLeft = style({
	textAlign: 'left',
});

export const textAlignRight = style({
	textAlign: 'right',
});
