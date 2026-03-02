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

export const categoryBadge = style({
	position: 'absolute',
	top: '10px',
	left: '10px',
	zIndex: 2,
	backgroundColor: palette.primary50,
	borderRadius: '4px',
	padding: '3px 8px',
	fontSize: '0.62rem',
	fontWeight: '700',
	letterSpacing: '0.06em',
	textTransform: 'uppercase',
	color: palette.primary,
	pointerEvents: 'none',
	border: `1px solid rgba(1,66,192,0.15)`,
});

export const cardWrapper = recipe({
	base: {
		position: 'relative',
		display: 'block',
		width: '100%',
		textDecoration: 'none',
		contentVisibility: 'auto',
		containIntrinsicSize: '0 360px',
	},
	variants: {
		variant: {
			default: {
				transition: 'transform 0.3s ease',
				':hover': {
					transform: 'translateY(-4px)',
				},
			},
			compact: {
				width: '300px',
			},
			featured: {
				transition: 'transform 0.3s ease',
				':hover': {
					transform: 'translateY(-3px)',
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
		backgroundColor: palette.primary50,
		'::after': {
			content: '""',
			position: 'absolute',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			background:
				'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
			transform: 'skewX(-25deg) translateX(-100%)',
			opacity: 0,
			transition: 'opacity 0.5s ease',
		},
	},
	variants: {
		variant: {
			default: {
				aspectRatio: '16/9',
				borderRadius: '8px 8px 0 0',
				selectors: {
					'&:hover::after': {
						opacity: 1,
						animation: `${shimmer} 1s ease-in-out`,
					},
				},
			},
			compact: {
				aspectRatio: '1/1',
				borderRadius: '8px 8px 0 0',
			},
			featured: {
				borderRadius: '8px 0 0 8px',
				aspectRatio: '4/3',
				selectors: {
					'&:hover::after': {
						opacity: 1,
						animation: `${shimmer} 1s ease-in-out`,
					},
				},
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

// marker class — must be defined before hoverOverlay/hoverContent reference it
export const imageWrapperHoverable = style({});

export const hoverOverlay = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	height: '50%',
	background:
		'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0) 100%)',
	opacity: 0,
	transition: 'opacity 0.2s',
	pointerEvents: 'none',
	zIndex: 1,
	selectors: {
		[`${imageWrapperHoverable}:hover &`]: { opacity: 1 },
	},
});

export const hoverContent = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: '12px 14px',
	opacity: 0,
	transform: 'translateY(8px)',
	transition: 'opacity 0.2s, transform 0.2s',
	pointerEvents: 'none',
	zIndex: 2,
	selectors: {
		[`${imageWrapperHoverable}:hover &`]: {
			opacity: 1,
			transform: 'translateY(0)',
		},
	},
});

export const hoverTitle = style({
	color: palette.white,
	fontSize: '0.8rem',
	fontWeight: '600',
	lineHeight: 1.3,
	marginBottom: '3px',
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: '1',
});

export const hoverAddress = style({
	color: 'rgba(255,255,255,0.75)',
	fontSize: '0.68rem',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	letterSpacing: '0.01em',
});

export const locationIcon = style({
	flexShrink: 0,
	color: palette.primary200,
	opacity: 0.8,
});

export const card = recipe({
	variants: {
		variant: {
			compact: {
				minHeight: 'fit-content',
				borderRadius: '8px',
				boxShadow: '0 2px 8px rgba(1,66,192,0.06)',
			},
			default: {
				borderRadius: '8px',
				boxShadow: '0 4px 16px rgba(1,66,192,0.06)',
				transition: 'box-shadow 0.3s ease',
				selectors: {
					'&:hover': {
						boxShadow: '0 12px 32px rgba(1,66,192,0.12)',
					},
				},
			},
			featured: {
				flexDirection: 'row',
				minHeight: '200px',
				borderRadius: '8px',
				boxShadow: '0 4px 16px rgba(1,66,192,0.06)',
				transition: 'box-shadow 0.3s ease',
				selectors: {
					'&:hover': {
						boxShadow: '0 12px 32px rgba(1,66,192,0.12)',
					},
				},
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const featuredContent = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: '20px 24px',
	flex: 1,
});

export const featuredCategory = style({
	fontSize: '0.62rem',
	fontWeight: '700',
	letterSpacing: '0.08em',
	textTransform: 'uppercase',
	color: palette.primary,
	marginBottom: '8px',
});

export const featuredTitle = style({
	fontSize: '1.1rem',
	fontWeight: '700',
	lineHeight: 1.3,
	color: palette.text,
	marginBottom: '8px',
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: '2',
	letterSpacing: '-0.01em',
});

export const featuredDescription = style({
	fontSize: '0.82rem',
	color: palette.gray300,
	lineHeight: 1.6,
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: '3',
	marginBottom: '14px',
});

export const featuredAddress = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	fontSize: '0.72rem',
	color: palette.primary200,
	marginTop: 'auto',
	letterSpacing: '0.01em',
});

export const cardContent = style({
	padding: '12px 14px',
});

export const cardTitle = style({
	fontSize: '0.875rem',
	fontWeight: '600',
	color: palette.text,
	lineHeight: 1.35,
	letterSpacing: '-0.01em',
});

export const cardAddress = style({
	fontSize: '0.72rem',
	color: palette.gray300,
});
