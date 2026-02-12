import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import {
	bodyText,
	border,
	hoverBg,
	mutedText,
} from '@/fsd/shared/styles/tokens';

export const tableAction = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '20px',
	paddingBottom: '16px',
	borderBottom: `1px solid ${border}`,
	flexWrap: 'wrap',
	gap: '12px',
});

export const searchInput = style({
	width: '260px',
	padding: '7px 12px',
	borderRadius: '6px',
	border: `1px solid ${border}`,
	backgroundColor: 'white',
	fontSize: '14px',
	transition: 'border-color 0.15s ease',

	':focus': {
		outline: 'none',
		borderColor: palette.primary,
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},

	'::placeholder': {
		color: mutedText,
	},

	'@media': {
		'(max-width: 768px)': {
			width: '100%',
		},
	},
});

export const newButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '7px 14px',
	borderRadius: '6px',
	backgroundColor: palette.primary,
	color: 'white',
	border: 'none',
	fontSize: '13px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'opacity 0.15s ease',

	':hover': {
		opacity: 0.85,
	},
});

export const tableWrapper = style({
	background: 'white',
	borderRadius: '8px',
	border: `1px solid ${border}`,
	overflow: 'hidden',
});

export const table = style({
	width: '100%',
	borderCollapse: 'collapse',
});

export const row = style({
	transition: 'background 0.1s ease',
	backgroundColor: 'white',

	':hover': {
		backgroundColor: hoverBg,
	},
});

export const actionButton = style({
	padding: '6px',
	borderRadius: '6px',
	backgroundColor: 'transparent',
	border: `1px solid ${border}`,
	color: mutedText,
	cursor: 'pointer',
	transition: 'all 0.15s ease',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	':hover': {
		backgroundColor: hoverBg,
		color: palette.primary,
		borderColor: 'rgba(0, 0, 0, 0.12)',
	},
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	padding: '12px',
	borderTop: `1px solid ${border}`,
});

export const pagination = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '12px 20px',
	borderTop: `1px solid ${border}`,
	flexWrap: 'wrap',
	gap: '12px',

	'@media': {
		'(max-width: 768px)': {
			flexDirection: 'column',
			alignItems: 'center',
			padding: '12px',
		},
	},
});

export const pageButton = style({
	padding: '6px 12px',
	borderRadius: '6px',
	border: `1px solid ${border}`,
	backgroundColor: 'white',
	color: mutedText,
	fontSize: '13px',
	cursor: 'pointer',
	transition: 'all 0.15s ease',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',

	':hover': {
		backgroundColor: hoverBg,
		borderColor: 'rgba(0, 0, 0, 0.12)',
	},
});

export const categoryBadge = style({
	display: 'inline-flex',
	padding: '2px 8px',
	background: 'rgba(0, 0, 0, 0.04)',
	borderRadius: '4px',
	fontSize: '12px',
	color: palette.primary,
});

export const thumbnail = style({
	width: '56px',
	height: '38px',
	objectFit: 'cover',
	borderRadius: '4px',
});

export const tipItem = style({
	padding: '2px 4px',
	borderRadius: '4px',

	':hover': {
		background: hoverBg,
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

export const toggleSortingButton = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.15s ease',
		color: palette.primary200,
	},
});

export const th = style({
	padding: '10px 20px',
	backgroundColor: 'white',
	borderBottom: `1px solid ${border}`,
	textAlign: 'left',
	whiteSpace: 'nowrap',
	fontSize: '12px',
	fontWeight: '500',
	color: mutedText,
	textTransform: 'uppercase',
	letterSpacing: '0.04em',

	'@media': {
		'(max-width: 768px)': {
			padding: '8px 12px',
			fontSize: '11px',
		},
	},
});

export const td = style({
	padding: '12px 20px',
	borderBottom: `1px solid ${border}`,
	fontSize: '14px',
	color: bodyText,
	verticalAlign: 'middle',

	'@media': {
		'(max-width: 768px)': {
			padding: '10px 12px',
			fontSize: '13px',
		},
	},
});
