import { style } from '@vanilla-extract/css';

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

export const formContainer = style({
	maxWidth: '800px',
	margin: '0 auto',
});

export const improveButton = style({
	background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
	border: 'none',
	color: 'white',
	transition: 'all 0.3s ease',

	':hover': {
		transform: 'translateY(-2px)',
		boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
	},

	':disabled': {
		opacity: 0.6,
		cursor: 'not-allowed',
		transform: 'none',
	},
});
