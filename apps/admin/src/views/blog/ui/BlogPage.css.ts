import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
});

export const statsSection = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
	gap: '1rem',
});

export const statCard = style({
	background: 'white',
	borderRadius: '12px',
	padding: '1.25rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	border: '1px solid #f1f5f9',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
});

export const statValue = style({
	fontSize: '1.5rem',
	fontWeight: '600',
	color: '#0142C0',
});

export const statLabel = style({
	fontSize: '0.875rem',
	color: '#64748b',
});
