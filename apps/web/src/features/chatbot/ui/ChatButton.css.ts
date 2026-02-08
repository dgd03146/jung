import { keyframes, style } from '@vanilla-extract/css';

const float = keyframes({
	'0%, 100%': { transform: 'translateY(0)' },
	'50%': { transform: 'translateY(-3px)' },
});

export const floatingButton = style({
	position: 'fixed',
	bottom: '24px',
	right: '24px',
	width: '56px',
	height: '56px',
	borderRadius: '50%',
	background: 'linear-gradient(135deg, #4D66E5 0%, #3B5BD9 100%)',
	border: '1px solid rgba(255, 255, 255, 0.2)',
	cursor: 'pointer',
	boxShadow: '0 4px 24px rgba(77, 102, 229, 0.4)',
	zIndex: 1000,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'all 0.2s ease',
	animation: `${float} 3s ease-in-out infinite`,
	color: '#fff',

	':hover': {
		transform: 'scale(1.08)',
		boxShadow: '0 6px 32px rgba(77, 102, 229, 0.55)',
	},

	':active': {
		transform: 'scale(0.95)',
	},

	'@media': {
		'(max-width: 768px)': {
			bottom: '16px',
			right: '16px',
			width: '52px',
			height: '52px',
		},
	},
});

export const iconWrapper = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'transform 0.2s ease',
});
