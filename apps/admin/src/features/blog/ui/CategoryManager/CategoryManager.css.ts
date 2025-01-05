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

export const modal = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0, 0, 0, 0.5)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 1000,
});

export const modalContent = style({
	background: 'rgba(255, 255, 255, 0.98)',
	backdropFilter: 'blur(16px)',
	borderRadius: '20px',
	padding: '32px',
	width: '100%',
	maxWidth: '560px',
	boxShadow: `
		0 0 0 1px rgba(0, 0, 0, 0.03),
		0 4px 6px rgba(0, 0, 0, 0.05),
		0 12px 24px rgba(0, 0, 0, 0.08)
	`,
	margin: '24px',
	maxHeight: 'calc(100dvh - 48px)',
	overflowY: 'auto',
});

export const modalTitle = style({
	fontSize: '22px',
	fontWeight: '700',
	color: '#1E293B',
	marginBottom: '28px',
	letterSpacing: '-0.02em',
});

export const formGroup = style({
	marginBottom: '28px',
	transition: 'all 0.2s ease',
});

export const colorGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(8, 1fr)',
	gap: '10px',
	marginTop: '12px',
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

export const input = style({
	width: '100%',
	height: '44px',
	padding: '0 16px',
	fontSize: '15px',
	border: '1px solid rgba(0, 0, 0, 0.08)',
	borderRadius: '12px',
	background: 'rgba(255, 255, 255, 0.9)',
	backdropFilter: 'blur(4px)',
	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		background: 'white',
		transform: 'translateY(-1px)',
		boxShadow: '0 3px 6px rgba(1, 66, 192, 0.08)',
	},
});

export const textarea = style({
	width: '100%',
	padding: '16px',
	fontSize: '15px',
	border: '1px solid rgba(0, 0, 0, 0.08)',
	borderRadius: '12px',
	background: 'rgba(255, 255, 255, 0.9)',
	backdropFilter: 'blur(4px)',
	height: '140px',
	resize: 'none',
	lineHeight: '1.5',
	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		background: 'white',
		boxShadow: '0 3px 6px rgba(1, 66, 192, 0.08)',
	},
});

export const modalActions = style({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '16px',
	marginTop: '32px',
	paddingTop: '24px',
	borderTop: '1px solid rgba(0, 0, 0, 0.06)',
});

export const saveButton = style({
	padding: '0 28px',
	height: '44px',
	background: '#0142C0',
	color: 'white',
	border: 'none',
	borderRadius: '12px',
	fontSize: '15px',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#0031A0',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 8px rgba(1, 66, 192, 0.2)',
	},
});

export const cancelButton = style({
	padding: '0 28px',
	height: '44px',
	background: '#f1f5f9',
	color: '#475569',
	border: 'none',
	borderRadius: '12px',
	fontSize: '15px',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#e2e8f0',
		color: '#1E293B',
	},
});

export const formLabel = style({
	display: 'block',
	fontSize: '14px',
	fontWeight: '600',
	color: '#475569',
	marginBottom: '10px',
	letterSpacing: '0.01em',
});

export const selectedColor = style({
	border: '2px solid white',
	boxShadow: '0 0 0 2px #0142C0',
});

export const colorPickerWrapper = style({
	marginTop: '8px',
});

export const modalOverlay = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	height: '100dvh',
	background: 'rgba(0, 0, 0, 0.5)',
	backdropFilter: 'blur(4px)',
	zIndex: 1000,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const modalHeader = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '24px',
});

export const closeButton = style({
	background: 'transparent',
	border: 'none',
	color: '#64748b',
	cursor: 'pointer',
	padding: '4px',
	borderRadius: '6px',
	transition: 'all 0.2s ease',

	':hover': {
		color: '#475569',
		background: '#f1f5f9',
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

export const errorMessage = style({
	color: '#dc2626',
	fontSize: '13px',
	marginTop: '4px',
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

export const colorInput = style({
	width: '100%',
	height: '40px',
	padding: '4px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	cursor: 'pointer',
	background: 'white',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#cbd5e1',
	},

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const inputError = style({
	borderColor: 'red',
	':focus': {
		borderColor: 'red',
	},
});
