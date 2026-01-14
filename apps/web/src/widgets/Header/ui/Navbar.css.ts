import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const BLUE = '#0033CC';

export const headerContainer = recipe({
	base: {
		height: '4rem',
		padding: '0 2rem',
		transition: 'all 0.2s ease',
		top: 0,
		position: 'sticky',
		zIndex: 10,
		display: 'flex',
		alignItems: 'center',
	},
	variants: {
		isScrolled: {
			true: {
				backgroundColor: 'rgba(255, 255, 255, 0.95)',
				backdropFilter: 'blur(8px)',
				WebkitBackdropFilter: 'blur(8px)',
				boxShadow: '0 1px 0 rgba(0, 0, 0, 0.05)',
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
			false: {},
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
	color: BLUE,
	fontWeight: 600,
	fontSize: '0.875rem',
	letterSpacing: '0.02em',
	textDecoration: 'none',
	transition: 'opacity 0.2s ease',
	':hover': {
		opacity: 0.7,
	},
});

export const menuButtonWrapper = style({
	display: 'none',
	'@media': {
		'(max-width: 768px)': {
			display: 'block',
		},
	},
});

export const desktopNavLinkItem = style({
	textDecoration: 'none',
	padding: '0.5rem 0',
	marginLeft: '2rem',
	position: 'relative',
	transition: 'opacity 0.2s ease',
	':hover': {
		opacity: 0.7,
	},
	'::after': {
		content: '""',
		position: 'absolute',
		bottom: '0.25rem',
		left: 0,
		width: 0,
		height: '1px',
		backgroundColor: BLUE,
		transition: 'width 0.2s ease',
	},
	selectors: {
		'&:hover::after': {
			width: '100%',
		},
		'&[data-active="true"]::after': {
			width: '100%',
		},
	},
});

export const navLinkText = style({
	fontWeight: 500,
	fontSize: '0.75rem',
	color: BLUE,
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
});
