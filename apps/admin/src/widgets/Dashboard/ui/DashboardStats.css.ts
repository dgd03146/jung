import { style } from '@vanilla-extract/css';

export const container = style({
	background: 'white',
	borderRadius: '16px',
	border: '1px solid #f1f5f9',
	overflow: 'hidden',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.02)',
});

export const header = style({
	padding: '20px 24px',
	borderBottom: '1px solid #f1f5f9',
});

export const title = style({
	fontSize: '15px',
	fontWeight: '600',
	color: '#0142C0',
	letterSpacing: '-0.01em',
});

export const statsGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	gap: '1px',
	background: '#f1f5f9',

	'@media': {
		'(max-width: 1400px)': {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
		'(max-width: 768px)': {
			gridTemplateColumns: '1fr',
		},
	},
});

export const statsCard = style({
	background: 'white',
	padding: '24px 28px',
	display: 'flex',
	transition: 'transform 0.2s ease, box-shadow 0.2s ease',
	position: 'relative',
	width: '100%',

	':hover': {
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.05)',
		zIndex: 1,
	},
});

export const iconWrapper = style({
	width: '42px',
	height: '42px',
	borderRadius: '12px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#f0f2ff',
	color: '#0142C0',
	flexShrink: 0,
	transition: 'transform 0.2s ease',

	selectors: {
		[`${statsCard}:hover &`]: {
			transform: 'scale(1.05)',
		},
	},
});

export const contentArea = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
});

export const statsHeader = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '12px',
});

export const statsValue = style({
	fontSize: '32px',
	fontWeight: '600',
	color: '#1e293b',
	lineHeight: 1.2,
	marginBottom: '6px',
	letterSpacing: '-0.02em',
});

export const statsTitle = style({
	fontSize: '14px',
	color: '#0142C0',
	marginBottom: '16px',
	fontWeight: '500',
});

export const statsInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const statsDescription = style({
	fontSize: '13px',
	color: '#111',
	fontWeight: '400',
	marginBottom: '8px',
});

export const trendArea = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '6px',
	padding: '6px 10px',
	background: '#f0fdf4',
	borderRadius: '8px',
	fontSize: '13px',
	fontWeight: '500',
	alignSelf: 'flex-start',
});

export const trendValue = style({
	color: '#16a34a',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	fontWeight: '600',
});

export const trendPeriod = style({
	color: '#64748b',
	fontSize: '12px',
});
