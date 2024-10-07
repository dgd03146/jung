import { style, styleVariants } from '@vanilla-extract/css';

const baseLoginOption = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '4px 8px',
	borderRadius: '20px',
	cursor: 'pointer',
	transition: 'all 0.3s ease',
});

export const loginOption = styleVariants({
	google: [
		baseLoginOption,
		{
			backgroundColor: '#ffffff',
			border: '1px solid #dadce0',
			color: '#3c4043',
			':hover': {
				backgroundColor: '#f8f9fa',
				boxShadow:
					'0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
				transform: 'translateY(-2px)',
			},
		},
	],
	naver: [
		baseLoginOption,
		{
			backgroundColor: '#03C75A',
			color: '#ffffff',
			':hover': {
				backgroundColor: '#02bd54',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
				transform: 'translateY(-2px)',
			},
		},
	],
	kakao: [
		baseLoginOption,
		{
			backgroundColor: '#FEE500',
			color: '#000000',
			':hover': {
				backgroundColor: '#fada0a',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
				transform: 'translateY(-2px)',
			},
		},
	],
});

export const iconStyle = style({
	width: '24px',
	height: '24px',
});
