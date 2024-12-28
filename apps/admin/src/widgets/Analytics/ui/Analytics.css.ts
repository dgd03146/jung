import { style } from '@vanilla-extract/css';

export const container = style({
	padding: '24px',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
});

export const statsGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	gap: '16px',
	marginBottom: '24px',

	'@media': {
		'(max-width: 1200px)': {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
		'(max-width: 640px)': {
			gridTemplateColumns: '1fr',
		},
	},
});

export const statCard = style({
	background: 'white',
	padding: '20px',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const statTitle = style({
	fontSize: '14px',
	color: '#64748b',
	fontWeight: '500',
});

export const statValue = style({
	fontSize: '28px',
	fontWeight: '600',
	color: '#1e293b',
	letterSpacing: '-0.02em',
});

export const statTrend = style({
	fontSize: '13px',
	color: '#16a34a',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
});

export const chartSection = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	padding: '24px',
});

export const sectionHeader = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '20px',
});

export const sectionTitle = style({
	fontSize: '16px',
	fontWeight: '600',
	color: '#1e293b',
});

export const periodSelector = style({
	display: 'flex',
	gap: '8px',
});

export const periodButton = style({
	padding: '6px 12px',
	borderRadius: '6px',
	border: '1px solid #e2e8f0',
	background: 'white',
	fontSize: '13px',
	color: '#64748b',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#f8fafc',
		borderColor: '#cbd5e1',
	},

	selectors: {
		'&[data-active="true"]': {
			background: '#0142C0',
			color: 'white',
			borderColor: '#0142C0',
		},
	},
});

export const contentSection = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	padding: '24px',
});

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
