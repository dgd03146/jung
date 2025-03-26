import { style } from '@vanilla-extract/css';

export const table = style({
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: '14px',

	selectors: {
		'th, td': {
			padding: '12px 16px',
			textAlign: 'left',
			borderBottom: '1px solid #f1f5f9',
		},
		th: {
			fontWeight: '500',
			color: '#64748b',
			background: '#f8fafc',
		},
		td: {
			color: '#1e293b',
		},
	},
});

export const chart = style({
	width: '100%',
	height: '400px',
	marginTop: '20px',
});

export const borderBottomStyle = style({
	borderBottomWidth: '1px',
});

export const gridContainer = style({
	gridTemplateColumns: 'minmax(0px, 1fr)',
	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
		'(min-width: 1024px)': {
			gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
		},
	},
});
