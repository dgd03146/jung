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
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `1.5px solid ${primaryLightColor}`,
});

export const defaultAvatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	border: '1.5px solid rgba(59, 130, 246, 0.15)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(59, 130, 246, 0.04)',
	color: 'rgba(59, 130, 246, 0.5)',
	flexShrink: 0,
});

const socialIconBase = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '28px',
	height: '28px',
	borderRadius: '6px',
	cursor: 'pointer',
	transition: 'background-color 0.2s ease, border-color 0.2s ease',
	padding: 0,
} as const;

export const socialIconButton = style({
	...socialIconBase,
	border: '1px solid #E2E8F0',
	backgroundColor: '#F8FAFC',

	':hover': {
		backgroundColor: '#EDF2F7',
		borderColor: '#CBD5E1',
	},
});

export const kakaoIconButton = style({
	...socialIconBase,
	border: '1px solid #F5E14D',
	backgroundColor: '#FEE500',
	color: '#191919',

	':hover': {
		backgroundColor: '#F5D800',
	},
});

export const githubIconButton = style({
	...socialIconBase,
	border: '1px solid #2D333B',
	backgroundColor: '#24292F',
	color: 'white',

	':hover': {
		backgroundColor: '#1B1F23',
	},
});
