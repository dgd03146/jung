import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const tableAction = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '24px',
	borderBottom: '1px solid #F1F5F9',
	backgroundColor: '#F8FAFC',
	flexWrap: 'wrap',
	gap: '16px',
});

export const searchInput = style({
	width: '280px',
	padding: '8px 16px',
	borderRadius: '8px',
	border: '1px solid #E2E8F0',
	backgroundColor: 'white',
	fontSize: '14px',
	transition: 'all 0.2s ease',
	boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

	':focus': {
		outline: 'none',
		borderColor: palette.primary,
		boxShadow: '0 0 0 3px rgba(1, 66, 192, 0.1)',
	},

	'::placeholder': {
		color: '#94A3B8',
	},

	'@media': {
		'(max-width: 1024px)': {
			width: '200px',
			fontSize: '13px',
			padding: '10px 16px',
		},

		'(max-width: 768px)': {
			width: '100%',
			maxWidth: '400px',
			margin: '0 auto',
		},

		'(max-width: 640px)': {
			fontSize: '14px',
			padding: '12px 16px',
			maxWidth: 'none',
		},

		'(max-width: 480px)': {
			borderRadius: '8px',
			padding: '10px 14px',
		},
	},
});
export const newButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 16px',
	borderRadius: '8px',
	backgroundColor: palette.primary,
	color: 'white',
	border: 'none',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	boxShadow: '0 1px 2px rgba(1, 66, 192, 0.1)',

	':hover': {
		backgroundColor: '#0052CC',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 6px rgba(1, 66, 192, 0.1)',
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

export const row = style({
	transition: 'all 0.2s ease',
	backgroundColor: 'white',

	':hover': {
		backgroundColor: '#F8FAFC',
	},
});

export const actionButton = style({
	padding: '10px',
	borderRadius: '10px',
	backgroundColor: '#F8FAFC',
	border: '1px solid #E2E8F0',
	color: '#64748B',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	':hover': {
		backgroundColor: '#F1F5F9',
		color: '#0142C0',
		borderColor: '#CBD5E1',
		transform: 'translateY(-1px)',
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
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '16px 24px',
	borderTop: '1px solid #F1F5F9',
	backgroundColor: '#F8FAFC',
	flexWrap: 'wrap',
	gap: '16px',

	'@media': {
		'(max-width: 768px)': {
			flexDirection: 'column',
			alignItems: 'center',
			padding: '16px',
		},
	},
});

export const pageButton = style({
	padding: '8px 16px',
	borderRadius: '10px',
	border: '1px solid #E2E8F0',
	backgroundColor: 'white',
	color: '#64748B',
	fontSize: '14px',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',

	'@media': {
		'(max-width: 768px)': {
			padding: '6px 12px',
			fontSize: '13px',
		},
	},

	':hover': {
		backgroundColor: '#F1F5F9',
		borderColor: '#CBD5E1',
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

// export const rating = style({
// 	display: 'inline-flex',
// 	alignItems: 'center',
// 	gap: '4px',
// 	color: '#ff9500',
// });

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

export const toggleSortingButton = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary200,
	},
});

export const th = style({
	padding: '16px 24px',
	backgroundColor: 'white',
	borderBottom: '1px solid #F1F5F9',
	textAlign: 'left',
	whiteSpace: 'nowrap',
	fontSize: '13px',
	fontWeight: '600',
	color: '#64748B',
	transition: 'all 0.2s ease',

	'@media': {
		'(max-width: 768px)': {
			padding: '12px 16px',
			fontSize: '12px',
		},
	},
});

export const td = style({
	padding: '16px 24px',
	borderBottom: '1px solid #F1F5F9',
	fontSize: '14px',
	color: '#334155',
	transition: 'all 0.2s ease',
	verticalAlign: 'middle',

	'@media': {
		'(max-width: 768px)': {
			padding: '12px 16px',
			fontSize: '13px',
		},
	},
});
