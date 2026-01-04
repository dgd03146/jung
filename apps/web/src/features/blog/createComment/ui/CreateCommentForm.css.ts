import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const primaryLightColor = 'rgba(59, 130, 246, 0.1)';

export const commentContainer = style({
	borderRadius: '12px',
	border: `1px solid ${palette.primary50}`,
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

export const userAvatar = style({
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `2px solid ${primaryLightColor}`,
});
