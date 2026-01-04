import { style } from '@vanilla-extract/css';

const veryLightBlueColor = 'rgba(59, 130, 246, 0.03)'; // 매우 연한 파란색

const primaryLightColor = 'rgba(59, 130, 246, 0.1)';
const borderColor = '#E2E8F0';
const textColor = '#2D3748';

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
	padding: '12px 12px 0 12px',
	marginBottom: '12px',
	backgroundColor: 'transparent',
	border: 'none',
	':hover': {
		boxShadow: 'none',
	},
});

export const nestedCommentItem = style({
	marginBottom: '12px',
	paddingBottom: '8px',
	borderBottom: `1px solid ${borderColor}`,
	':last-child': {
		marginBottom: 0,
		paddingBottom: 0,
		borderBottom: 'none',
	},
});

export const replyContainer = style({
	marginLeft: '30px',
	marginTop: '8px',
	padding: '12px',
	borderLeft: `2px solid ${primaryLightColor}`,
	backgroundColor: veryLightBlueColor,
	borderRadius: '0 12px 12px 0',
});

export const commentContent = style({
	fontSize: '14px',
	lineHeight: '1.6',
	fontWeight: '400',
	color: textColor,
	marginBottom: '12px',
});
