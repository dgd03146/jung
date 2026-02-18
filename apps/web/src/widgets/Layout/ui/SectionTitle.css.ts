import {
	fontFamily,
	mediaQueries,
	palette,
	space,
} from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const sectionTitle = style({
	display: 'block',
	marginBottom: space['8'],
	'@media': {
		[mediaQueries.tablet]: {
			marginBottom: space['6'],
		},
	},
});

export const sectionText = style({
	fontFamily: fontFamily.poppins,
	fontSize: 'clamp(2rem, 5vw, 3.5rem)',
	fontWeight: '700',
	color: palette.swiss,
	letterSpacing: '-0.02em',
	lineHeight: 1,
	transition: 'opacity 0.2s ease',
	':hover': {
		opacity: 0.6,
	},
});

export const sectionLink = style({
	display: 'flex',
	alignItems: 'center',
});
