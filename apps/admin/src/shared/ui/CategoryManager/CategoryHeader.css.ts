import { style } from '@vanilla-extract/css';

export const header = style({
	padding: '20px 24px',
	borderBottom: '1px solid #f1f5f9',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const title = style({
	fontSize: '16px',
	fontWeight: '600',
	color: '#0142C0',
	letterSpacing: '-0.01em',
});

export const viewToggle = style({
	display: 'flex',
	gap: '4px',
	padding: '2px',
	background: '#f1f5f9',
	borderRadius: '8px',
});

export const viewToggleButton = style({
	padding: '6px 12px',
	border: 'none',
	borderRadius: '6px',
	fontSize: '13px',
	fontWeight: '500',
	color: '#64748b',
	background: 'transparent',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		color: '#475569',
	},

	selectors: {
		'&[data-active="true"]': {
			background: 'white',
			color: '#0142C0',
			boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
		},
	},
});

export const addButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '0 20px',
	height: '40px',
	background: '#0142C0',
	color: 'white',
	border: 'none',
	borderRadius: '10px',
	fontSize: '14px',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	boxShadow: '0 2px 4px rgba(124, 58, 237, 0.1)',

	':hover': {
		background: '#0031A0',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 6px rgba(124, 58, 237, 0.2)',
	},
});

export const borderBottom = style({
	borderBottomWidth: '1px',
});
