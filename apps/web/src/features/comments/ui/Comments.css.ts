import { keyframes, style } from '@vanilla-extract/css';

// FIXME: 디자인 시스템 고치기

const darkBlueColor = '#0142C0'; // 진한 파란색
const veryLightBlueColor = 'rgba(59, 130, 246, 0.03)'; // 매우 연한 파란색

const primaryColor = '#3B82F6'; // 더 밝은 파란색

const primaryLightColor = 'rgba(59, 130, 246, 0.1)';
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

export const nestedCommentContainer = style({
	padding: '12px',
	marginBottom: '12px',
	backgroundColor: 'transparent',
	border: 'none',
	':hover': {
		boxShadow: 'none',
	},
});

export const nestedCommentItem = style({
	marginBottom: '16px',
	paddingBottom: '16px',
	borderBottom: `1px solid ${borderColor}`,
	':last-child': {
		marginBottom: 0,
		paddingBottom: 0,
		borderBottom: 'none',
	},
});

export const commentHeader = style({
	display: 'flex',
	alignItems: 'center',
	marginBottom: '12px',
	columnGap: '8px',
});

export const userAvatar = style({
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `2px solid ${primaryLightColor}`,
});

export const userInfoContainer = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	// width: '80px',
});

export const userName = style({
	fontSize: '14px',
	fontWeight: 'bold',
	textAlign: 'center',
	wordBreak: 'break-word',
});

export const commentInputContainer = style({
	display: 'flex',
	alignItems: 'flex-start',
	gap: '16px',
	marginBottom: '16px',
});

export const textareaContainer = style({
	flex: 1,
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
	color: primaryColor,
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
	borderLeft: `2px solid ${primaryLightColor}`,
	backgroundColor: veryLightBlueColor,
	borderRadius: '0 12px 12px 0',
});

export const buttonBase = style({
	padding: '8px 16px',
	borderRadius: '6px',
	border: 'none',
	cursor: 'pointer',
	fontSize: '14px',
	transition: 'all 0.2s ease',
});

export const submitButton = style([
	buttonBase,
	{
		backgroundColor: '#0142C0',
		color: 'white',
		':hover': {
			backgroundColor: '#0031A0',
		},
	},
]);

export const signOutButton = style([
	buttonBase,
	{
		backgroundColor: 'transparent',
		color: '#0142C0',
		border: '1px solid #0142C0',
		':hover': {
			backgroundColor: 'rgba(1, 66, 192, 0.1)',
		},
	},
]);

export const buttonContainer = style({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '12px',
	marginTop: '12px',
});

const shimmer = keyframes({
	'0%': { backgroundPosition: '-468px 0' },
	'100%': { backgroundPosition: '468px 0' },
});

const skeletonBase = style({
	backgroundColor: '#f0f0f0',
	backgroundImage:
		'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
	backgroundSize: '200% 100%',
	animation: `${shimmer} 1.5s infinite`,
});

export const skeletonCommentContainer = style([
	commentContainer,
	{
		marginBottom: '16px',
	},
]);

export const skeletonAvatar = style([
	userAvatar,
	skeletonBase,
	{
		marginRight: '12px',
	},
]);

export const skeletonUserName = style([
	skeletonBase,
	{
		width: '100px',
		height: '14px',
		borderRadius: '4px',
		marginBottom: '8px',
	},
]);

export const skeletonContent = style([
	skeletonBase,
	{
		height: '14px',
		borderRadius: '4px',
		marginBottom: '8px',
	},
]);

export const skeletonAction = style([
	skeletonBase,
	{
		width: '60px',
		height: '14px',
		borderRadius: '4px',
		marginRight: '12px',
	},
]);

export const skeletonReplyContainer = style([
	replyContainer,
	{
		marginTop: '12px',
	},
]);

export const replyItem = style([
	commentContainer,
	{
		border: 'none',
		padding: '12px',
		marginBottom: '8px',
		':hover': {
			boxShadow: 'none',
		},
	},
]);
