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

export const header = style({
	padding: '20px 24px',
	borderBottom: '1px solid #f1f5f9',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const title = style({
	fontSize: '16px',
	fontWeight: '600',
	color: '#0142C0',
	letterSpacing: '-0.01em',
});

export const addButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '0 20px',
	height: '40px',
	background: '#0142C0',
	color: 'white',
	border: 'none',
	borderRadius: '10px',
	fontSize: '14px',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#0031A0',
		transform: 'translateY(-1px)',
	},
});

export const gridView = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
	gap: '24px',
	padding: '24px',
});

export const collectionCard = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	overflow: 'hidden',
	transition: 'all 0.2s ease',

	':hover': {
		transform: 'translateY(-4px)',
		boxShadow: '0 12px 24px -8px rgba(1, 66, 192, 0.15)',
	},
});

export const imageContainer = style({
	position: 'relative',
	paddingBottom: '66%',
	overflow: 'hidden',
});

export const image = style({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	transition: 'transform 0.3s ease',

	':hover': {
		transform: 'scale(1.05)',
	},
});

export const content = style({
	padding: '16px',
});

export const description = style({
	fontSize: '14px',
	color: '#64748b',
	marginTop: '8px',
	marginBottom: '12px',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	lineHeight: '1.5',
});

export const tags = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '8px',
	marginTop: '12px',
});

export const tag = style({
	padding: '4px 8px',
	background: 'rgba(1, 66, 192, 0.08)',
	color: '#0142C0',
	borderRadius: '6px',
	fontSize: '12px',
	fontWeight: '500',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '12px 16px',
	borderTop: '1px solid #f1f5f9',
	background: '#f8fafc',
});

export const photoCount = style({
	fontSize: '13px',
	color: '#0142C0',
	fontWeight: '500',
});

export const date = style({
	fontSize: '13px',
	color: '#64748b',
});

export const actions = style({
	position: 'absolute',
	top: '12px',
	right: '12px',
	display: 'flex',
	gap: '8px',
	opacity: 0,
	transition: 'opacity 0.2s ease',

	selectors: {
		[`${collectionCard}:hover &`]: {
			opacity: 1,
		},
	},
});

export const actionButton = style({
	width: '32px',
	height: '32px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'white',
	border: 'none',
	borderRadius: '8px',
	color: '#64748b',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

	':hover': {
		background: '#0142C0',
		color: 'white',
		transform: 'translateY(-2px)',
	},
});

export const cancelButton = style({
	padding: '0 20px',
	height: '40px',
	background: '#f1f5f9',
	color: '#64748b',
	border: 'none',
	borderRadius: '8px',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#e2e8f0',
	},
});

export const saveButton = style({
	padding: '0 20px',
	height: '40px',
	background: '#0142C0',
	color: 'white',
	border: 'none',
	borderRadius: '8px',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#0031A0',
	},
});

export const collectionLink = style({
	textDecoration: 'none',
	color: 'inherit',
	display: 'block',

	':hover': {
		textDecoration: 'none',
	},
});

export const formGroup = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
});

export const inputGroup = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const inputLabel = style({
	fontSize: '14px',
	fontWeight: '500',
	color: '#1e293b',
});

export const imageUploadContainer = style({
	display: 'flex',
	gap: '8px',
});

export const hiddenFileInput = style({
	display: 'none',
});

export const uploadButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '0 16px',
	height: '40px',
	backgroundColor: '#f8fafc',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	color: '#64748b',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: '#f1f5f9',
		borderColor: '#cbd5e1',
	},
});

export const imagePreview = style({
	marginTop: '12px',
	borderRadius: '8px',
	overflow: 'hidden',
	border: '1px solid #e2e8f0',
});

export const formLayout = style({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: '32px',
	marginBottom: '24px',

	'@media': {
		'screen and (max-width: 768px)': {
			gridTemplateColumns: '1fr',
		},
	},
});

export const imageSection = style({
	gridColumn: '1',
});

export const detailsSection = style({
	gridColumn: '2',

	'@media': {
		'screen and (max-width: 768px)': {
			gridColumn: '1',
		},
	},
});

export const uploadArea = style({
	width: '100%',
	aspectRatio: '1',
	border: '2px dashed #e2e8f0',
	borderRadius: '12px',
	cursor: 'pointer',
	overflow: 'hidden',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: '#0142C0',
		background: '#f8fafc',
	},
});

export const uploadPrompt = style({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#64748b',
	padding: '24px',
});

export const uploadPromptText = style({
	margin: '12px 0 4px',
	fontSize: '16px',
	fontWeight: '500',
});

export const uploadPromptSubtext = style({
	fontSize: '14px',
});

export const previewImage = style({
	width: '100%',
	height: '100%',
	objectFit: 'contain',
	padding: '12px',
});

export const label = style({
	display: 'block',
	fontSize: '14px',
	fontWeight: '500',
	color: '#1e293b',
	marginBottom: '8px',
});

export const input = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#1e293b',
	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const textarea = style({
	width: '100%',
	padding: '12px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#1e293b',
	resize: 'vertical',
	minHeight: '100px',
	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const modalOverlay = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0, 0, 0, 0.5)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '24px',
	zIndex: 1000,
});

export const modalContent = style({
	background: 'white',
	borderRadius: '16px',
	padding: '24px',
	width: '100%',
	maxWidth: '600px',
	maxHeight: 'calc(100vh - 48px)',
	overflow: 'auto',
	position: 'relative',
});

export const modalTitle = style({
	fontSize: '20px',
	fontWeight: '600',
	color: '#0f172a',
	marginBottom: '24px',
});

export const modalActions = style({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '12px',
	marginTop: '24px',
	borderTop: '1px solid #f1f5f9',
	paddingTop: '24px',
});

export const form = style({
	display: 'flex',
	flexDirection: 'column',
});
