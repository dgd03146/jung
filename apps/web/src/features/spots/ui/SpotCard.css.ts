import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': { transform: 'skewX(-25deg) translateX(-100%)' },
	'100%': { transform: 'skewX(-25deg) translateX(100%)' },
});

export const cardWrapper = style({
	display: 'block',
	width: '100%',
	textDecoration: 'none',
	transition: 'all 0.3s ease',

	':hover': {
		transform: 'translateY(-4px)',
	},
});

export const imageOverlay = style({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	padding: '8px', // 패딩 줄임
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'flex-start',
	zIndex: 1,
});

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '4/3', // 16/9에서 4/3으로 변경하여 더 큰 이미지 표시
	overflow: 'hidden',
	backgroundColor: palette.gray100,
	borderRadius: '12px 12px 0 0',

	'::before': {
		content: '""',
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		background:
			'linear-gradient(45deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
		opacity: 0,
		transition: 'opacity 0.5s ease',
	},

	'::after': {
		content: '""',
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		background:
			'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
		transform: 'skewX(-25deg) translateX(-100%)',
		opacity: 0,
		transition: 'opacity 0.5s ease',
	},

	selectors: {
		'&:hover': {
			transform: 'scale(1.01)',
			boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
		},
		'&:hover::before': {
			opacity: 1,
		},
		'&:hover::after': {
			opacity: 1,
			animation: `${shimmer} 1s ease-in-out`,
		},
	},
});

export const likeButton = style({
	width: '24px',
	height: '24px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(255, 255, 255, 0.6)',
	borderRadius: '50%',
	border: 'none',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	color: palette.primary,
	backdropFilter: 'blur(4px)',

	':hover': {
		transform: 'scale(1.1)',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		color: palette.primary,
	},

	':active': {
		transform: 'scale(0.95)',
	},
});

export const content = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
});

export const title = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	WebkitLineClamp: 1,
	WebkitBoxOrient: 'vertical',
	marginBottom: '4px',
	fontWeight: 500,
});

export const location = style({
	minHeight: '40px',
});

export const locationIcon = style({
	flexShrink: 0,
	marginTop: '2px',
	color: palette.primary,
});

export const address = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	lineHeight: '1.4',
	color: palette.gray400,
	maxWidth: '90%',
	fontSize: '14px',
});

export const footer = style({
	marginTop: 'auto',
	paddingTop: '12px',
});
