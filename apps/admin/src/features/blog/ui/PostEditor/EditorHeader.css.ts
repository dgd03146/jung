import { style } from '@vanilla-extract/css';

export const header = style({
	marginTop: '8px',
	marginBottom: '24px',
	width: '100%',
});

export const buttonText = style({
	'@media': {
		'(max-width: 640px)': {
			display: 'none',
		},
	},
});

export const buttonGroup = style({
	display: 'flex',
	gap: '8px',
	'@media': {
		'(max-width: 480px)': {
			gap: '4px',
		},
	},
});

export const backButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 12px',
	borderRadius: '6px',
	backgroundColor: 'transparent',
	border: '1px solid rgba(1, 66, 192, 0.3)',
	color: '#0142C0',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.04)',
		borderColor: '#0142C0',
		transform: 'translateY(-1px)',
		boxShadow: '0 2px 4px rgba(1, 66, 192, 0.1)',
	},

	'@media': {
		'(max-width: 640px)': {
			padding: '8px',
		},
		'(max-width: 480px)': {
			padding: '6px',
		},
	},
});

export const actionButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 12px',
	borderRadius: '6px',
	backgroundColor: 'white',
	border: '1px solid rgba(55, 53, 47, 0.16)',
	color: '#37352F',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: '#F8FAFC',
		borderColor: 'rgba(55, 53, 47, 0.3)',
		transform: 'translateY(-1px)',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
	},

	':active': {
		transform: 'translateY(0)',
		boxShadow: 'none',
	},

	'@media': {
		'(max-width: 640px)': {
			padding: '8px',
		},
		'(max-width: 480px)': {
			padding: '6px',
		},
	},
});

export const submitButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 16px',
	borderRadius: '6px',
	backgroundColor: '#0142C0',
	border: '1px solid transparent',
	color: 'white',
	fontSize: '14px',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	boxShadow: '0 1px 2px rgba(1, 66, 192, 0.1)',

	':hover': {
		backgroundColor: '#0052CC',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 6px rgba(1, 66, 192, 0.15)',
	},

	':active': {
		transform: 'translateY(0)',
		boxShadow: '0 1px 2px rgba(1, 66, 192, 0.1)',
	},

	':disabled': {
		backgroundColor: 'rgba(1, 66, 192, 0.5)',
		opacity: 0.7,
		cursor: 'not-allowed',
		transform: 'none',
		boxShadow: 'none',
	},

	'@media': {
		'(max-width: 640px)': {
			padding: '8px 12px',
		},
		'(max-width: 480px)': {
			padding: '6px 8px',
		},
	},
});

export const buttonIcon = style({
	width: '16px',
	height: '16px',
	flexShrink: 0,
});
