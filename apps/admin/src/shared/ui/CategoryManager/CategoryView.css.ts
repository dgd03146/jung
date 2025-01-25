import { style } from '@vanilla-extract/css';
import { actionButton, dragHandle, postCount } from './CategoryCard.css';

export const listViewItem = style({
	display: 'flex',
	alignItems: 'center',
	padding: '16px',
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	transition: 'all 0.2s ease',

	':hover': {
		transform: 'translateX(4px)',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
	},
});

export const listViewMeta = style({
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
	marginLeft: 'auto',
	color: '#64748B',
	fontSize: '14px',
});

export const gridView = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
	gap: '20px',
	padding: '24px',
});

export const categoryBadge = style({
	display: 'inline-flex',
	alignItems: 'center',
	padding: '2px 8px',
	borderRadius: '4px',
	fontSize: '12px',
	fontWeight: '500',
	background: '#f0f2ff',
	color: '#0142C0',
});

export const dragHandleStyle = style([dragHandle, {}]);

export const actionButtonStyle = style([actionButton, {}]);

export const postCountStyle = style([postCount, {}]);
