import { style } from '@vanilla-extract/css';

export const categoryCard = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	borderTop: '4px solid',
	overflow: 'hidden',
	transition: 'all 0.2s ease',
	position: 'relative',

	':hover': {
		transform: 'translateY(-2px)',
		boxShadow: '0 8px 16px rgba(0, 0, 0, 0.06)',
	},
});

export const cardHeader = style({
	padding: '16px 8px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const expandButton = style({
	background: 'transparent',
	border: 'none',
	padding: '4px 8px',
	cursor: 'pointer',
	color: '#64748b',
	transition: 'color 0.2s ease',

	':hover': {
		color: '#0142C0',
	},
});

export const parentBadge = style({
	display: 'inline-block',
	padding: '2px 6px',
	fontSize: '11px',
	fontWeight: '500',
	color: '#64748b',
	background: '#f1f5f9',
	borderRadius: '4px',
	marginLeft: '8px',
});

export const categoryName = style({
	fontSize: '14px',
	fontWeight: '600',
	color: '#1E293B',
	flex: 1,
});

export const cardContent = style({
	padding: '16px',
});

export const description = style({
	fontSize: '13px',
	lineHeight: '1.5',
	color: '#475569',

	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
});

export const cardFooter = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '12px 16px',
	borderTop: '1px solid #E5E7EB',
	background: '#F9FAFB',
});

export const postCount = style({
	display: 'inline-flex',
	alignItems: 'center',
	height: '24px',
	padding: '0 8px',
	fontSize: '12px',
	fontWeight: '500',
	color: '#64748B',
	background: '#F1F5F9',
	borderRadius: '4px',
});

// Common style

export const actions = style({
	display: 'flex',
	gap: '4px',
});

export const actionButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '28px',
	height: '28px',
	border: 'none',
	borderRadius: '6px',
	color: '#94a3b8',
	background: 'transparent',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#f1f5f9',
		color: '#0142C0',
	},
});

export const dragHandle = style({
	cursor: 'grab',
	color: '#94a3b8',
	padding: '0 8px',
	fontSize: '18px',
	display: 'flex',
	alignItems: 'center',

	':active': {
		cursor: 'grabbing',
	},
});
