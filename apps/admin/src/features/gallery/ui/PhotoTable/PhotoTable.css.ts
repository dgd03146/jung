import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const border = 'rgba(0, 0, 0, 0.06)';
const hoverBg = 'rgba(0, 0, 0, 0.02)';
const mutedText = 'rgba(0, 0, 0, 0.45)';
const bodyText = 'rgba(0, 0, 0, 0.8)';

export const container = style({
	backgroundColor: 'white',
	borderRadius: '8px',
	border: `1px solid ${border}`,
	overflow: 'hidden',
	width: '100%',
});

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
	textAlign: 'center',

	'@media': {
		'(max-width: 768px)': {
			padding: '10px 12px',
			fontSize: '13px',
		},
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

export const row = style({
	transition: 'background 0.1s ease',
	backgroundColor: 'white',

	':hover': {
		backgroundColor: hoverBg,
	},
});
