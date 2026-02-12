import { createVar, style } from '@vanilla-extract/css';

export const backgroundColor = createVar();

const border = 'rgba(0, 0, 0, 0.06)';
const borderHover = 'rgba(0, 0, 0, 0.1)';
const subtleText = 'rgba(0, 0, 0, 0.35)';
const hoverBg = 'rgba(0, 0, 0, 0.02)';

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
	border: `1px solid ${border}`,
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
});

export const mainSection = style({
	background: 'white',
	borderRadius: '16px',
	border: `1px solid ${border}`,
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
	overflow: 'hidden',
});

export const listViewItem = style({
	backgroundColor: backgroundColor,
	borderRadius: '12px',
	border: `1px solid ${border}`,
	marginBottom: '12px',
	overflow: 'hidden',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: borderHover,
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
	color: subtleText,

	':hover': {
		background: hoverBg,
		borderColor: borderHover,
	},

	selectors: {
		'&[data-variant="approve"]:hover': {
			background: 'rgba(34, 197, 94, 0.06)',
			borderColor: 'rgba(34, 197, 94, 0.3)',
			color: '#22c55e',
		},
		'&[data-variant="reject"]:hover': {
			background: 'rgba(239, 68, 68, 0.06)',
			borderColor: 'rgba(239, 68, 68, 0.3)',
			color: '#ef4444',
		},
		'&[data-variant="delete"]:hover': {
			background: hoverBg,
			borderColor: borderHover,
			color: 'rgba(0, 0, 0, 0.45)',
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
	border: `1px solid ${border}`,
	overflow: 'hidden',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: borderHover,
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
