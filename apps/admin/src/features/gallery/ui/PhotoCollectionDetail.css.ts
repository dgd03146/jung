import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	background: '#FFFFFF',
});

export const header = style({
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
	padding: '16px 24px',
	borderBottom: '1px solid #F3F4F6',
});

export const backButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '6px 12px',
	border: '1px solid #E5E7EB',
	borderRadius: '6px',
	background: '#FFFFFF',
	color: '#374151',
	fontSize: '14px',
	cursor: 'pointer',
	transition: 'all 0.15s ease',

	':hover': {
		background: '#F9FAFB',
	},
});

export const title = style({
	flex: 1,
	fontSize: '18px',
	fontWeight: '600',
	color: '#111827',
});

export const actions = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
});

export const actionButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 16px',
	border: '1px solid #E5E7EB',
	borderRadius: '6px',
	background: '#FFFFFF',
	color: '#374151',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.15s ease',

	':hover': {
		background: '#F9FAFB',
		borderColor: '#D1D5DB',
	},

	selectors: {
		'&:hover': {
			background: '#F9FAFB',
			borderColor: '#D1D5DB',
		},
		'&:first-child': {
			background: '#2563EB',
			color: '#FFFFFF',
			borderColor: '#2563EB',
		},
		'&:first-child:hover': {
			background: '#1D4ED8',
		},
		'&[data-danger="true"]': {
			border: '1px solid #FCA5A5',
			color: '#DC2626',
		},
		'&[data-danger="true"]:hover': {
			background: '#FEF2F2',
		},
	},
});

export const photoGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '16px',
	padding: '24px',
	overflow: 'auto',
});

export const photoItem = style({
	position: 'relative',
	aspectRatio: '1',
	borderRadius: '8px',
	overflow: 'hidden',
	cursor: 'pointer',
	transition: 'all 0.15s ease',
	border: '2px solid transparent',
	background: '#FFFFFF',

	':hover': {
		borderColor: '#E5E7EB',
	},
});

export const selected = style({
	border: '2px solid #2563EB',
	boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)',

	':hover': {
		borderColor: '#2563EB',
	},
});

export const photo = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	transition: 'all 0.15s ease',

	selectors: {
		[`${selected} &`]: {
			filter: 'brightness(1.02)',
		},
	},
});

export const photoOverlay = style({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0, 0, 0, 0)',
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'flex-end',
	padding: '12px',
	transition: 'all 0.15s ease',

	selectors: {
		[`${selected} &`]: {
			background:
				'linear-gradient(180deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%)',
		},
	},
});

export const checkboxWrapper = style({
	position: 'absolute',
	top: '12px',
	right: '12px',
	width: '22px',
	height: '22px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#FFFFFF',
	borderRadius: '6px',
	border: '1.5px solid #D1D5DB',
	transition: 'all 0.15s ease',
	boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

	selectors: {
		[`${photoItem}:hover &`]: {
			borderColor: '#2563EB',
			// background: '#FFFFFF',
		},
		[`${selected} &`]: {
			borderColor: '#2563EB',
			background: '#2563EB',
			transform: 'scale(1.05)',
		},
	},
});

export const checkbox = style({
	display: 'none',
});

export const checkIcon = style({
	width: '14px',
	height: '14px',
	color: '#FFFFFF',
	opacity: 0,
	transition: 'all 0.15s ease',
	transform: 'scale(0.8)',

	selectors: {
		[`${selected} &`]: {
			opacity: 1,
			transform: 'scale(1)',
		},
	},
});

export const emptyState = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	margin: '40px 24px',
	padding: '32px',
	gap: '8px',
	background: '#F9FAFB',
	borderRadius: '8px',
	border: '1px dashed #E5E7EB',
});

export const emptyStateIcon = style({
	fontSize: '24px',
	color: '#9CA3AF',
});

export const emptyStateText = style({
	fontSize: '14px',
	color: '#6B7280',
});
