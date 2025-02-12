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
