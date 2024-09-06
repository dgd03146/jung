import { style } from '@vanilla-extract/css';

export const tagStyle = style({
	display: 'inline-flex',
	alignItems: 'center',
	padding: '0.25rem 0.75rem',
	borderRadius: '9999px',
	fontSize: '0.875rem',
	fontWeight: 500,
	backgroundColor: '#ebf8ff',
	color: '#2b6cb0',
	marginRight: '0.5rem',
	marginBottom: '0.5rem',
});

export const closeButtonStyle = style({
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	padding: '0.125rem',
	marginLeft: '0.25rem',
	borderRadius: '50%',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	':hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
	},
});
