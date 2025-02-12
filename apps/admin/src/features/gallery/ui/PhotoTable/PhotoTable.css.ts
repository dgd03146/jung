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
