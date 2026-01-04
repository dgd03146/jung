import { style } from '@vanilla-extract/css';

const BLUE = '#0033CC';

export const container = style({
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	gridTemplateRows: 'auto 1fr',
	backgroundColor: BLUE,
	height: '100vh',
	padding: '2rem',
	overflow: 'hidden',

	'@media': {
		'(max-width: 768px)': {
			gridTemplateColumns: '1fr',
			gridTemplateRows: 'auto 1fr auto',
			padding: '1.5rem',
			height: 'auto',
			minHeight: '100vh',
			overflow: 'visible',
		},
	},
});

export const header = style({
	gridColumn: '1 / -1',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-start',
	marginBottom: '2rem',
});

export const logo = style({
	fontSize: '0.875rem',
	fontWeight: 600,
	color: '#FFFFFF',
	letterSpacing: '0.02em',
});

export const nav = style({
	display: 'flex',
	gap: '1.5rem',
});

export const navLink = style({
	fontSize: '0.75rem',
	fontWeight: 500,
	color: 'rgba(255, 255, 255, 0.7)',
	textDecoration: 'none',
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
	transition: 'color 0.2s ease',

	':hover': {
		color: '#FFFFFF',
	},
});

export const main = style({
	display: 'flex',
	alignItems: 'flex-end',
});

export const heroText = style({
	lineHeight: 0.82,
	fontWeight: 900,
	letterSpacing: '-0.06em',
	color: '#FFFFFF',
	fontSize: 'clamp(100px, 18vw, 280px)',
	fontFamily: 'var(--font-poppins), sans-serif',

	'@media': {
		'(max-width: 768px)': {
			fontSize: 'clamp(48px, 14vw, 100px)',
		},
	},
});

export const heroLine = style({
	display: 'block',
});

export const sidebar = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	gap: '2rem',
	textAlign: 'right',
	paddingBottom: '1rem',

	'@media': {
		'(max-width: 768px)': {
			gridRow: '3',
			flexDirection: 'row',
			textAlign: 'left',
			gap: '2rem',
			paddingTop: '2rem',
			flexWrap: 'wrap',
		},
	},
});

export const infoBlock = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.25rem',
});

export const label = style({
	fontSize: '0.625rem',
	fontWeight: 500,
	color: 'rgba(255, 255, 255, 0.5)',
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
});

export const value = style({
	fontSize: '0.75rem',
	fontWeight: 500,
	color: '#FFFFFF',
	lineHeight: 1.4,
});
