import { style, styleVariants } from '@vanilla-extract/css';

// FIXME: 디자인 시스템 고치기

const darkBlueColor = '#0142C0'; // 진한 파란색
const veryLightBlueColor = 'rgba(59, 130, 246, 0.05)'; // 매우 연한 파란색

const primaryColor = '#3B82F6'; // 더 밝은 파란색

const primaryLightColor = 'rgba(59, 130, 246, 0.1)';
const primaryMediumColor = 'rgba(59, 130, 246, 0.2)';
const borderColor = '#E2E8F0';
const textColor = '#2D3748';
// const lightTextColor = '#718096';

export const commentContainer = style({
	borderRadius: '12px',
	border: `1px solid ${borderColor}`,
	padding: '16px',
	marginBottom: '16px',
	transition: 'all 0.2s ease',
	backgroundColor: '#FFFFFF',
	':hover': {
		boxShadow: `0 2px 8px ${primaryLightColor}`,
	},
});

export const commentHeader = style({
	display: 'flex',
	alignItems: 'center',
	marginBottom: '12px',
});

export const userAvatar = style({
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	marginRight: '12px',
	objectFit: 'cover',
	border: `2px solid ${primaryLightColor}`,
});

export const commentContent = style({
	fontSize: '14px',
	lineHeight: '1.6',
	color: textColor,
	marginBottom: '12px',
});

export const commentFooter = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginTop: '12px',
});

export const actionButton = style({
	display: 'flex',
	alignItems: 'center',
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	color: darkBlueColor,
	fontSize: '12px',
	padding: '6px 10px',
	borderRadius: '6px',
	transition: 'all 0.2s ease',
});

export const actionButtonHover = style({
	':hover': {
		backgroundColor: primaryLightColor,
		color: primaryColor,
	},
});

export const textarea = style({
	width: '100%',
	padding: '12px',
	borderRadius: '8px',
	border: `1px solid ${borderColor}`,
	fontSize: '14px',
	resize: 'none',
	transition: 'all 0.2s ease',
	':focus': {
		outline: 'none',
		borderColor: primaryColor,
		boxShadow: `0 0 0 3px ${primaryLightColor}`,
	},
});

export const replyContainer = style({
	marginLeft: '24px',
	marginTop: '12px',
	padding: '12px',
	borderLeft: `2px solid ${primaryMediumColor}`,

	backgroundColor: veryLightBlueColor,
	borderRadius: '0 12px 12px 0',
});

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
});

export const iconStyle = style({
	width: '20px',
	height: '20px',
	transition: 'transform 0.3s ease',
	':hover': {
		transform: 'scale(1.1)',
	},
});
