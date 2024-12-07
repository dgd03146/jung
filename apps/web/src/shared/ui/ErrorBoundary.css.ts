import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const errorContainer = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '2rem',
	background: '#F5FBFF', // lighter primary50
	borderRadius: '0.75rem',
	color: '#001F52', // darker primary300 for better contrast
	textAlign: 'center',
	boxShadow: '0 4px 10px rgba(0, 39, 102, 0.1)',
	width: '90%',
	maxWidth: '600px',
	margin: '0 auto',
	minHeight: calc.subtract('100dvh', '144px'),
	overflowY: 'auto',
	'@media': {
		'screen and (min-width: 768px)': {
			padding: '3rem',
			width: '80%',
		},
		'screen and (min-width: 1024px)': {
			padding: '4rem',
			width: '70%',
		},
	},
});

export const errorHeading = style({
	color: '#001F52', // darker primary300
	marginBottom: '1.5rem',
	fontSize: '1.75rem',
	fontWeight: 'bold',
	lineHeight: '1.2',
	'@media': {
		'screen and (min-width: 768px)': {
			fontSize: '2rem',
		},
	},
});

export const errorText = style({
	color: '#3A67B9', // adjusted primary200 for better readability
	fontSize: '1rem',
	lineHeight: '1.6',
	marginBottom: '2rem',
	'@media': {
		'screen and (min-width: 768px)': {
			fontSize: '1.125rem',
		},
	},
});

export const tryAgainButton = style({
	backgroundColor: '#0142C0', // primary
	color: '#FFFFFF',
	padding: '0.75rem 1.5rem',
	borderRadius: '0.375rem',
	fontWeight: '600',
	fontSize: '1rem',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	border: 'none',
	':hover': {
		backgroundColor: '#0050E0', // slightly lighter for hover effect
		transform: 'translateY(-2px)',
		boxShadow: '0 4px 6px rgba(0, 66, 192, 0.2)',
	},
});

export const errorDetails = style({
	backgroundColor: '#FFFFFF',
	marginTop: '1rem',
	borderRadius: '0.5rem',
	width: '100%',
	boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
});

export const errorDetailsSummary = style({
	color: '#0142C0', // primary
	cursor: 'pointer',
	fontWeight: '600',

	fontSize: '0.875rem',
	transition: 'color 0.2s ease',
	':hover': {
		color: '#0050E0', // slightly lighter for hover effect
	},
});

export const errorStackTrace = style({
	color: '#4A4A4A', // darker gray for better readability
	backgroundColor: '#F8F8F8', // lighter background
	padding: '1rem',
	borderRadius: '0.375rem',
	fontSize: '0.75rem',
	overflow: 'auto',
	whiteSpace: 'pre-wrap',
	maxHeight: '200px', // limit height and add scroll
});
