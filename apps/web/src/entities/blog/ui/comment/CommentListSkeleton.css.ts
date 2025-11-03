import { keyframes } from '@vanilla-extract/css';

import { style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': { backgroundPosition: '-468px 0' },
	'100%': { backgroundPosition: '468px 0' },
});

const borderColor = '#E2E8F0';
const primaryLightColor = 'rgba(59, 130, 246, 0.1)';
const veryLightBlueColor = '#F9FAFB';

export const userAvatar = style({
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `2px solid ${primaryLightColor}`,
});

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

export const replyContainer = style({
	marginLeft: '12px',
	marginTop: '12px',
	padding: '12px',
	borderLeft: `2px solid ${primaryLightColor}`,
	backgroundColor: veryLightBlueColor,
	borderRadius: '0 12px 12px 0',
});

export const skeletonReplyContainer = style([
	replyContainer,
	{
		marginTop: '12px',
	},
]);
