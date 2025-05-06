import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const fadeIn = keyframes({
	from: { opacity: 0, transform: 'translateY(-10px)' },
	to: { opacity: 1, transform: 'translateY(0)' },
});

const slideIn = keyframes({
	from: { transform: 'scaleX(0)', opacity: 0 },
	to: { transform: 'scaleX(1)', opacity: 1 },
});

export const headerContainer = recipe({
	base: style({
		height: '4.5rem',
		padding: '0.5rem 0',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		animation: `${fadeIn} 0.5s ease-out`,
		borderBottom: '1px solid transparent',
		top: 0,

		position: 'sticky',

		zIndex: 10,
	}),
	variants: {
		isScrolled: {
			true: {
				backgroundColor: 'rgba(255, 255, 255, 0.85)',
				backdropFilter: 'blur(8px)',
				WebkitBackdropFilter: 'blur(8px)',
				boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
				height: '3.5rem',
				padding: '0.25rem 0',
			},
			false: {
				backgroundColor: 'transparent',
			},
		},
		isMenuOpen: {
			true: {
				zIndex: 20,
				backgroundColor: 'transparent',
			},
			false: {
				// zIndex: 10,
			},
		},
	},
	defaultVariants: {
		isScrolled: false,
		isMenuOpen: false,
	},
});

export const navContent = style({
	height: '100%',
	maxWidth: '92%',
});

export const logoWrapper = style({
	// marginLeft: '-16px',
	color: palette.primary,
	fontFamily: 'var(--font-bebas)',
	transition: 'all 0.3s ease',
	selectors: {
		'&:hover': {
			transform: 'translateY(-2px)',
			color: palette.primary200,
		},
	},
});

export const menuButtonWrapper = style({
	// position: 'relative',
	display: 'none',
	// gap: '10px',
	transition: 'transform 0.2s ease',
	selectors: {
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	'@media': {
		'(max-width: 768px)': {
			display: 'block',
		},
	},
});

export const desktopNavLinkItem = style({
	textDecoration: 'none',
	padding: '0.6rem 1rem',

	borderRadius: '4px',
	transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
	position: 'relative',
	display: 'inline-block',

	selectors: {
		'&:hover': {
			backgroundColor: `${palette.primary}08`,
			transform: 'translateY(-1px)',
		},
		'&[data-active="true"]': {
			backgroundColor: `${palette.primary}06`,
		},
	},
});

export const navLinkText = style({
	fontWeight: '600',
	color: palette.primary,
	fontFamily: 'var(--font-bebas)',
	transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
	display: 'inline-block',

	selectors: {
		'&:hover': {
			color: palette.primary200,
		},
	},
	// opacity: 0.85,
});
