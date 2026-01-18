import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const shimmer = keyframes({
	'0%': { transform: 'skewX(-25deg) translateX(-100%)' },
	'100%': { transform: 'skewX(-25deg) translateX(100%)' },
});

export const imageOverlay = style({
	position: 'absolute',
	top: '8px',
	right: '8px',
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'flex-start',
	zIndex: 2,
	pointerEvents: 'auto',
});

export const cardWrapper = recipe({
	base: {
		position: 'relative',
		display: 'block',
		width: '100%',
		textDecoration: 'none',
		transition: 'all 0.3s ease',
		contentVisibility: 'auto',
		containIntrinsicSize: '0 420px',
	},
	variants: {
		variant: {
			default: {
				':hover': {
					transform: 'translateY(-4px)',
				},
			},
			compact: {
				width: '300px',
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
		borderRadius: '8px 8px 0 0',
		minHeight: '200px',
		'::before': {
			content: '""',
			display: 'block',
			paddingTop: '66.67%',
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
				height: '240px',

				selectors: {
					'&:hover': {
						transform: 'scale(1.01)',
						boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
					},
					'&:hover::after': {
						opacity: 1,
						animation: `${shimmer} 1s ease-in-out`,
					},
				},
			},
			compact: {
				height: '180px',

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

export const likeButton = style({
	width: '28px',
	height: '28px',
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

export const locationIcon = style({
	flexShrink: 0,

	color: palette.primary,
});

export const card = recipe({
	variants: {
		variant: {
			compact: {
				minHeight: 'fit-content',
			},
			default: {
				minHeight: '416px',
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});
