import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
	// padding: '0 24px',
	background: '#f8fafc',
});

export const header = style({
	marginBottom: '24px',
	background: 'white',
	padding: '20px 24px',
	borderRadius: '12px',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
});

export const backButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '8px',
	color: '#64748b',
	fontSize: '14px',
	textDecoration: 'none',
	marginBottom: '16px',
	transition: 'color 0.2s ease',

	':hover': {
		color: '#0142C0',
	},
});

export const title = style({
	fontSize: '24px',
	fontWeight: '600',
	color: '#0142C0',
	margin: 0,
});

export const form = style({
	background: 'white',
	borderRadius: '12px',
	padding: '24px',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',

	display: 'flex',
	flexDirection: 'column',
});

export const formLayout = style({
	display: 'flex',

	gap: '32px',
	flex: 1,
	overflow: 'hidden',

	'@media': {
		'screen and (max-width: 1200px)': {
			flexDirection: 'column',
		},
	},
});

export const imageSection = style({
	flexBasis: '50%',
	display: 'flex',
	flexDirection: 'column',
});

export const detailsSection = style({
	flex: 1,
	overflow: 'auto',
	paddingRight: '16px',

	'@media': {
		'screen and (max-width: 768px)': {
			minWidth: '100%',
		},
	},
});

export const uploadArea = style({
	width: '100%',
	aspectRatio: '16/9',
	border: '2px dashed #e2e8f0',
	borderRadius: '12px',
	cursor: 'pointer',
	overflow: 'hidden',
	transition: 'all 0.2s ease',
	background: '#f8fafc',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	height: '100%',

	':hover': {
		borderColor: '#0142C0',
		background: '#f1f5f9',
	},
});

export const uploadPromptText = style({
	margin: '12px 0 4px',
	fontSize: '16px',
	fontWeight: '500',
});

export const uploadPromptSubtext = style({
	fontSize: '14px',
});

export const uploadPrompt = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#64748b',
	padding: '24px',
});

export const previewImage = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});

export const hiddenFileInput = style({
	display: 'none',
});

export const inputGroup = style({
	marginBottom: '20px',
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
	resize: 'none',

	transition: 'all 0.2s ease',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},
});

export const formActions = style({
	marginTop: '24px',
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '12px',
	padding: '16px 0',
	borderTop: '1px solid #e2e8f0',
});

export const cancelButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '0 20px',
	height: '40px',
	background: '#f1f5f9',
	color: '#64748b',
	border: 'none',
	borderRadius: '8px',
	fontSize: '14px',
	fontWeight: '500',
	textDecoration: 'none',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#e2e8f0',
	},
});

export const submitButton = style({
	padding: '0 24px',
	height: '44px',
	background: '#0142C0',
	color: 'white',
	border: 'none',
	borderRadius: '8px',
	fontSize: '15px',
	fontWeight: '600',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#0031A0',
		transform: 'translateY(-1px)',
	},

	':disabled': {
		background: '#94a3b8',
		cursor: 'not-allowed',
		transform: 'none',
	},
});

export const sectionTitle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	fontSize: '18px',
	fontWeight: '600',
	color: '#0142C0',
	marginBottom: '16px',
});

export const formCard = style({
	background: '#f8fafc',
	borderRadius: '12px',
	padding: '24px',
	border: '1px solid #e2e8f0',
});

export const selectWrapper = style({
	position: 'relative',

	':after': {
		content: '""',
		position: 'absolute',
		right: '12px',
		top: '50%',

		width: '10px',
		height: '10px',
		borderRight: '2px solid #64748b',
		borderBottom: '2px solid #64748b',
		transform: 'translateY(-50%) rotate(45deg)',
		pointerEvents: 'none',
	},
});

export const select = style({
	width: '100%',
	height: '40px',
	padding: '0 32px 0 12px',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#1e293b',
	backgroundColor: 'white',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	appearance: 'none',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},

	':hover': {
		borderColor: '#cbd5e1',
	},
});

export const required = style({
	color: 'red',
});

export const errorMessage = style({
	color: 'red',
	fontSize: '12px',
	marginTop: '4px',
});

export const inputError = style({
	borderColor: 'red',
});
