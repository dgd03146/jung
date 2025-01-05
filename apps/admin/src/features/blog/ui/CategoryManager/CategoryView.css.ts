import { style } from '@vanilla-extract/css';
import {
	actionButton,
	actions,
	dragHandle,
	postCount,
} from './CategoryCard.css';
import { categoryBadge } from './CategoryManager.css';

export const listView = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	padding: '24px',
});

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

export const listViewContent = style({
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
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

export const dragHandleStyle = style([dragHandle, {}]);

export const actionButtonStyle = style([actionButton, {}]);

export const actionsStyle = style([actions, {}]);

export const categoryBadgeStyle = style([categoryBadge, {}]);

export const postCountStyle = style([postCount, {}]);
