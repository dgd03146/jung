import { globalStyle, style } from '@vanilla-extract/css';

export const commentContainer = style({
	borderRadius: '12px',
	border: '1px solid rgba(0, 0, 0, 0.08)',
	padding: '16px',
	marginBottom: '16px',
	transition: 'border-color 0.15s ease',
	backgroundColor: '#FFFFFF',
	':hover': {
		borderColor: 'rgba(0, 0, 0, 0.15)',
	},
});

globalStyle(
	`${commentContainer} input::placeholder, ${commentContainer} textarea::placeholder`,
	{
		fontWeight: 300,
		color: 'rgba(0, 0, 0, 0.3)',
	},
);

export const userAvatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: '1.5px solid rgba(0, 0, 0, 0.06)',
});

export const defaultAvatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	border: '1.5px solid rgba(0, 0, 0, 0.06)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(0, 0, 0, 0.03)',
	color: 'rgba(0, 0, 0, 0.3)',
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
	transition: 'background-color 0.15s ease, border-color 0.15s ease',
	padding: 0,
} as const;

export const socialIconButton = style({
	...socialIconBase,
	border: '1px solid rgba(0, 0, 0, 0.08)',
	backgroundColor: 'rgba(0, 0, 0, 0.02)',

	':hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		borderColor: 'rgba(0, 0, 0, 0.15)',
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
