import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
	background: '#f8fafc',
	padding: '0 24px',
});

export const header = style({
	marginBottom: '24px',
	background: 'white',
	padding: '20px 24px',
	borderRadius: '12px',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
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
	marginBottom: '24px',
	minHeight: '500px',

	'@media': {
		'screen and (max-width: 768px)': {
			flexDirection: 'column',
			height: 'auto',
		},
	},
});

export const basicSection = style({
	width: '60%',
	minWidth: 0,
	display: 'flex',
	flexDirection: 'column',
	'@media': {
		'screen and (max-width: 768px)': {
			width: '100%',
		},
	},
});

export const additionalSection = style({
	width: '40%',
	minWidth: 0,
	display: 'flex',
	flexDirection: 'column',

	'@media': {
		'screen and (max-width: 768px)': {
			width: '100%',
		},
	},
});

export const formCard = style({
	flex: 1,
	background: '#f8fafc',
	borderRadius: '12px',
	padding: '24px',
	border: '1px solid #e2e8f0',
});

export const inputGroup = style({
	marginBottom: '20px',

	':last-child': {
		marginBottom: 0,
	},
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
	background: 'white',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},

	':hover': {
		borderColor: '#cbd5e1',
	},

	'::placeholder': {
		color: '#94a3b8',
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
	background: 'white',

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.1)',
	},

	':hover': {
		borderColor: '#cbd5e1',
	},
});

export const formRow = style({
	display: 'grid',
	gridTemplateColumns: '2fr 1fr 1fr',
	gap: '12px',

	'@media': {
		'screen and (max-width: 768px)': {
			gridTemplateColumns: '1fr',
		},
	},
});

export const arrayField = style({
	display: 'flex',
	gap: '8px',
	marginBottom: '8px',

	':last-child': {
		marginBottom: 0,
	},
});

export const iconButton = style({
	width: '40px',
	height: '40px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: '1px solid #e2e8f0',
	borderRadius: '8px',
	background: 'white',
	color: '#64748b',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#f8fafc',
		borderColor: '#0142C0',
		color: '#0142C0',
	},
});

export const addButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '8px',
	padding: '0 16px',
	height: '40px',
	border: '1px dashed #e2e8f0',
	borderRadius: '8px',
	background: 'white',
	color: '#64748b',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#f8fafc',
		borderColor: '#0142C0',
		color: '#0142C0',
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
