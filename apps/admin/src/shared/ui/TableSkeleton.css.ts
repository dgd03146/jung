import { style } from '@vanilla-extract/css';

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
