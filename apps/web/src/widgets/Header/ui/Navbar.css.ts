import { style } from '@vanilla-extract/css';
import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const fadeIn = keyframes({
	from: { opacity: 0, transform: 'translateY(-10px)' },
	to: { opacity: 1, transform: 'translateY(0)' },
});

export const headerContainer = recipe({
	base: style({
		height: '4.5rem',
		padding: '0.5rem 0',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		animation: `${fadeIn} 0.5s ease-out`,
		borderBottom: '1px solid transparent',
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
				backgroundColor: 'transparent',
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
	padding: '0 1rem',
	transition: 'all 0.3s ease',
});

export const logoWrapper = recipe({
	base: style({
		position: 'relative',
		display: 'inline-block',
		padding: '0.5rem',
		transition: 'all 0.3s ease',
		selectors: {
			'&:hover': {
				transform: 'translateY(-1px)',
			},
		},
	}),
	variants: {
		isScrolled: {
			false: {
				selectors: {
					'&::after': {
						content: '""',
						position: 'absolute',
						bottom: 0,
						left: '50%',
						width: 0,
						height: '2px',

						transition: 'all 0.3s ease',
						transform: 'translateX(-50%)',
					},
					'&:hover::after': {
						width: '100%',
					},
				},
			},
		},
	},
	defaultVariants: {
		isScrolled: false,
	},
});

export const logo = style({
	fontFamily: 'var(--font-bebas)',
});

export const menuButtonWrapper = style({
	position: 'relative',
	transition: 'transform 0.2s ease',
	selectors: {
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
});
