import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
});

export const mainSection = style({
	background: 'white',
	borderRadius: '16px',
	border: '1px solid #f1f5f9',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.02)',
	overflow: 'hidden',
});

export const categoryGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
	gap: '20px',
	padding: '24px',
});

export const categoryMeta = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	marginBottom: '12px',
});

export const categorySlug = style({
	fontSize: '12px',
	color: '#64748B',
	display: 'block',
	marginBottom: '4px',
});

export const postsList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	marginTop: '12px',
	padding: '12px',
	background: '#f8fafc',
	borderRadius: '8px',
});

export const postItem = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px',
	borderRadius: '6px',
	transition: 'all 0.2s ease',
	cursor: 'pointer',

	':hover': {
		background: 'white',
		color: '#0142C0',
	},
});

export const postTitle = style({
	fontSize: '13px',
	color: '#475569',
	fontWeight: '450',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const morePostsLink = style({
	fontSize: '13px',
	color: '#64748b',
	textAlign: 'center',
	padding: '8px',
	borderTop: '1px solid #e2e8f0',
	marginTop: '4px',
	cursor: 'pointer',

	':hover': {
		color: '#0142C0',
	},
});

export const colorOption = style({
	width: '36px',
	height: '36px',
	borderRadius: '10px',
	border: 'none',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'transform 0.2s ease',

	':hover': {
		transform: 'scale(1.15)',
	},
});

export const postItemIcon = style({
	color: '#94a3b8',
	flexShrink: 0,
});

export const postItemDate = style({
	fontSize: '12px',
	color: '#94a3b8',
	marginLeft: 'auto',
});

export const emptyState = style({
	padding: '32px',
	textAlign: 'center',
	color: '#64748b',
});

export const emptyStateIcon = style({
	color: '#94a3b8',
	marginBottom: '12px',
});

export const emptyStateText = style({
	fontSize: '14px',
	marginBottom: '16px',
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

export const successMessage = style({
	color: '#059669',
	fontSize: '13px',
	marginTop: '4px',
});

export const loadingSpinner = style({
	animation: 'spin 1s linear infinite',
	color: '#0142C0',
});

export const tooltipWrapper = style({
	position: 'relative',
	display: 'inline-block',
});

export const tooltip = style({
	position: 'absolute',
	bottom: '100%',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '6px 10px',
	borderRadius: '6px',
	background: '#1e293b',
	color: 'white',
	fontSize: '12px',
	whiteSpace: 'nowrap',
	pointerEvents: 'none',
	opacity: 0,
	transition: 'opacity 0.2s ease',
	zIndex: 10,

	selectors: {
		[`${tooltipWrapper}:hover &`]: {
			opacity: 1,
		},
	},
});

export const filterDropdown = style({
	padding: '6px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#475569',
	outline: 'none',
	cursor: 'pointer',
	background: 'white',

	':focus': {
		borderColor: '#0142C0',
	},
});

export const viewToggleGroup = style({
	display: 'flex',
	gap: '4px',
	padding: '2px',
	background: '#f1f5f9',
	borderRadius: '6px',
});

export const headerTitle = style({
	fontSize: '16px',
	fontWeight: '600',
	color: '#1E293B',
	marginRight: '24px',
});

export const addCategoryButton = style({
	height: '36px',
	padding: '0 16px',
	fontSize: '14px',
	fontWeight: '500',
	color: '#FFFFFF',
	background: '#6366F1',
	border: 'none',
	borderRadius: '6px',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#4F46E5',
	},
});

export const headerContainer = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '16px 24px',
	borderBottom: '1px solid #E5E7EB',
});

export const filters = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
});
