import { style, styleVariants } from '@vanilla-extract/css';

const baseLoginOption = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 12px',
	borderRadius: '8px',
	cursor: 'pointer',
	transition: 'all 0.3s ease',
	fontSize: '14px',
	fontWeight: '500',
});

export const loginOption = styleVariants({
	google: [
		baseLoginOption,
		{
			backgroundColor: '#FFFFFF',
			border: '1px solid #D1D5DB',
			color: '#3C4043',
			':hover': {
				backgroundColor: '#F9FAFB',
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
				transform: 'translateY(-2px)',
			},
		},
	],
	naver: [
		baseLoginOption,
		{
			backgroundColor: '#03C75A',
			color: '#FFFFFF',
			border: '1px solid #03C75A',
			':hover': {
				backgroundColor: '#02bd54',
				boxShadow: '0 2px 4px rgba(3,199,90,0.3)',
				transform: 'translateY(-2px)',
			},
		},
	],
	kakao: [
		baseLoginOption,
		{
			backgroundColor: '#FEE500',
			color: '#000000',
			border: '1px solid #FEE500',
			':hover': {
				backgroundColor: '#FADA0A',
				boxShadow: '0 2px 4px rgba(254,229,0,0.3)',
				transform: 'translateY(-2px)',
			},
		},
	],
	github: [
		baseLoginOption,
		{
			backgroundColor: '#24292e',
			color: '#FFFFFF',
			border: '1px solid #24292e',
			':hover': {
				backgroundColor: '#2f363d',
				boxShadow: '0 2px 4px rgba(36,41,46,0.3)',
				transform: 'translateY(-2px)',
			},
		},
	],
});

export const iconStyle = style({
	width: '20px',
	height: '20px',
	transition: 'transform 0.3s ease',
	':hover': {
		transform: 'scale(1.1)',
	},
});
