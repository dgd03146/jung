import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { actionButton, dragHandle, postCount } from './CategoryCard.css';

const border = 'rgba(0, 0, 0, 0.06)';
const mutedText = 'rgba(0, 0, 0, 0.45)';

export const listViewItem = style({
	display: 'flex',
	alignItems: 'center',
	padding: '16px',
	background: 'white',
	borderRadius: '12px',
	border: `1px solid ${border}`,
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
	color: mutedText,
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
	background: 'rgba(1, 66, 192, 0.06)',
	color: palette.primary,
});

export const dragHandleStyle = style([dragHandle, {}]);

export const actionButtonStyle = style([actionButton, {}]);

export const postCountStyle = style([postCount, {}]);
