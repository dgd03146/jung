import { createVar, style } from '@vanilla-extract/css';
import {
	border,
	borderHover,
	dangerActionBg,
	dangerActionBorder,
	dangerText,
	hoverBg,
	mutedText,
	subtleText,
	successActionBg,
	successActionBorder,
	successText,
} from '@/fsd/shared/styles/tokens';

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
			background: successActionBg,
			borderColor: successActionBorder,
			color: successText,
		},
		'&[data-variant="reject"]:hover': {
			background: dangerActionBg,
			borderColor: dangerActionBorder,
			color: dangerText,
		},
		'&[data-variant="delete"]:hover': {
			background: hoverBg,
			borderColor: borderHover,
			color: mutedText,
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
