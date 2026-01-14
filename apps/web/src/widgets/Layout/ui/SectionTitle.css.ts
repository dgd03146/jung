import { style } from '@vanilla-extract/css';

const BLUE = '#0033CC';

export const sectionTitle = style({
	display: 'block',
	marginBottom: '2rem',
	'@media': {
		'(max-width: 768px)': {
			marginBottom: '1.5rem',
		},
	},
});

export const sectionText = style({
	fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
	fontWeight: 700,
	color: BLUE,
	letterSpacing: '-0.02em',
	lineHeight: 1,
	transition: 'opacity 0.2s ease',
	':hover': {
		opacity: 0.7,
	},
});

export const sectionLink = style({
	display: 'flex',
	alignItems: 'center',
});
