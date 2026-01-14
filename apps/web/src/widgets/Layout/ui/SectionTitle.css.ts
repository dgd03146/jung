import { fontWeights, palette, space } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const sectionTitle = style({
	display: 'block',
	marginBottom: space['8'],
	'@media': {
		'(max-width: 768px)': {
			marginBottom: space['6'],
		},
	},
});

export const sectionText = style({
	fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
	fontWeight: fontWeights.bold,
	color: palette.swiss,
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
