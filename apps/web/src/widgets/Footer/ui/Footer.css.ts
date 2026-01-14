import { style } from '@vanilla-extract/css';

const BLUE = '#0033CC';

export const footer = style({
	height: '72px',
	maxWidth: '92%',
	borderTop: '1px solid rgba(0, 0, 0, 0.08)',
});

export const footerText = style({
	fontSize: '0.75rem',
	fontWeight: 500,
	color: BLUE,
	letterSpacing: '0.02em',
});

export const socialIconText = style({
	color: BLUE,
	transition: 'opacity 0.2s ease',
	':hover': {
		opacity: 0.7,
	},
});
