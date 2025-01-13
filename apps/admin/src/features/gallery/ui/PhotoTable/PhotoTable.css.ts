import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	backgroundColor: 'white',
	borderRadius: '12px',
	boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
	border: '1px solid #F1F5F9',
	overflow: 'hidden',
	width: '100%',
});

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

export const th = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '8px 16px',
	backgroundColor: 'white',
	borderBottom: '1px solid #F1F5F9',

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
	textAlign: 'center',

	'@media': {
		'(max-width: 768px)': {
			padding: '12px 16px',
			fontSize: '13px',
		},
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

export const row = style({
	transition: 'all 0.2s ease',
	backgroundColor: 'white',

	':hover': {
		backgroundColor: '#F8FAFC',
	},
});

export const statusBadge = style({
	padding: '6px 16px',
	borderRadius: '20px',
	fontSize: '12px',
	fontWeight: '500',
	backgroundColor: 'rgba(16, 185, 129, 0.1)',
	color: '#10B981',
	display: 'inline-flex',
	alignItems: 'center',
	gap: '6px',
});

export const tableWrapper = style({
	margin: '0 24px',
	borderRadius: '12px',
	border: '1px solid #F1F5F9',
	overflow: 'auto',

	'@media': {
		'(max-width: 1024px)': {
			margin: '0 16px',
		},
		'(max-width: 640px)': {
			margin: '0 12px',
		},
	},
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

export const pageInfo = style({
	fontSize: '14px',
	color: '#64748B',

	'@media': {
		'(max-width: 768px)': {
			fontSize: '13px',
			textAlign: 'center',
		},
	},
});

export const paginationButtons = style({
	display: 'flex',
	gap: '8px',
	flexWrap: 'wrap',
	justifyContent: 'center',

	'@media': {
		'(max-width: 640px)': {
			width: '100%',
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

export const responsiveHide = style({
	'@media': {
		'(max-width: 640px)': {
			display: 'none',
		},
	},
});

export const responsiveStack = style({
	'@media': {
		'(max-width: 768px)': {
			display: 'flex',
			flexDirection: 'column',
			gap: '8px',
		},
	},
});
