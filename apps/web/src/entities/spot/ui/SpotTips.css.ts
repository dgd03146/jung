import { style } from '@vanilla-extract/css';

export const tipItem = style({
	backgroundColor: '#f8fafc',
	padding: '16px',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#002349',
	border: '1px solid rgba(1, 66, 192, 0.12)',
	transition: 'all 0.2s ease',
	lineHeight: '1.6',

	selectors: {
		'&:hover': {
			backgroundColor: '#ffffff',
			border: '1px solid rgba(1, 66, 192, 0.2)',
			boxShadow: '0 2px 8px rgba(1, 66, 192, 0.08)',
			transform: 'translateY(-1px)',
		},
	},
});
