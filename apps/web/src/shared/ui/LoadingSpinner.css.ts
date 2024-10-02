import { keyframes, style } from '@vanilla-extract/css';

const spin = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
});

export const spinnerContainer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '40px',
});

export const spinner = style({
	display: 'inline-block',
	width: '20px',
	height: '20px',
	borderRadius: '50%',
	border: '2px solid transparent',
	borderTopColor: '#007bff',
	borderRightColor: '#007bff',
	animation: `${spin} 0.8s linear infinite`,
});
