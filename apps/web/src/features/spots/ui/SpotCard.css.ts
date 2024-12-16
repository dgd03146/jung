import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const shimmer = keyframes({
	'0%': { transform: 'skewX(-25deg) translateX(-100%)' },
	'100%': { transform: 'skewX(-25deg) translateX(100%)' },
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

export const cardWrapper = recipe({
	base: {
		display: 'block',
		width: '100%',
		aspectRatio: '3/4',
		textDecoration: 'none',
		transition: 'all 0.3s ease',
	},
	variants: {
		variant: {
			default: {
				':hover': {
					transform: 'translateY(-4px)',
				},
			},
			compact: {
				aspectRatio: '2/3',
				width: '300px',
				':hover': {
					transform: 'none',
				},
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const imageWrapper = recipe({
	base: {
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
		flexShrink: '0',
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
	},
	variants: {
		variant: {
			default: {
				aspectRatio: '4/3',

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
			},
			compact: {
				aspectRatio: '16/9',

				selectors: {
					'&:hover': {
						transform: 'none',
						boxShadow: 'none',
					},
				},
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const content = recipe({
	base: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: '4px',
	},
	variants: {
		variant: {
			default: {},
			compact: {
				padding: '8px',
				gap: '4px',
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const title = recipe({
	base: {
		flexShrink: 0,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		WebkitLineClamp: 1,
		WebkitBoxOrient: 'vertical',
		marginBottom: '4px',
		fontWeight: 500,
	},
	variants: {
		variant: {
			default: {},
			compact: {
				fontSize: '14px',
			},
		},
	},
	defaultVariants: {
		variant: 'default',
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

export const address = recipe({
	base: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		WebkitLineClamp: 2,
		WebkitBoxOrient: 'vertical',
		lineHeight: '1.4',
		color: palette.gray400,

		fontSize: '12px',
	},
	variants: {
		variant: {
			default: {},
			compact: {
				WebkitLineClamp: 1,
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const description = style({
	flex: '0 0 auto',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	fontSize: '14px',
});

export const location = recipe({
	base: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '4px',
		flexShrink: 0,
	},
	variants: {
		variant: {
			default: {},
			compact: {
				height: '32px',
			},
		},
	},
});

export const locationIcon = style({
	flexShrink: 0,

	color: palette.primary,
	width: '16px',
	height: '16px',
});

export const footer = style({
	flexDirection: 'column',

	alignItems: 'flex-start',
	flexShrink: 0,
});
