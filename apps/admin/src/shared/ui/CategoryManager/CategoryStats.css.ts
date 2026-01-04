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

export const statsSection = style({
	gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
});
