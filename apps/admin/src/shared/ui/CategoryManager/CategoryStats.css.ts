import { style } from '@vanilla-extract/css';

export const statCard = style({
	background: 'white',
	borderRadius: '16px',
	padding: '24px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	border: '1px solid #f1f5f9',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.02)',
	transition: 'transform 0.2s ease',

	':hover': {
		transform: 'translateY(-2px)',
	},
});

export const statValue = style({
	fontSize: '28px',
	fontWeight: '600',
	color: '#0142C0',
	letterSpacing: '-0.02em',
});

export const statLabel = style({
	fontSize: '14px',
	color: '#64748b',
	fontWeight: '500',
});

export const statsSection = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
	gap: '1rem',
});
