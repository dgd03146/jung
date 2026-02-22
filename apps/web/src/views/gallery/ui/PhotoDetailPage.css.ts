import { palette } from '@jung/design-system/tokens';
import { createVar, style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	maxWidth: '100%',
	margin: '0 auto',
	minHeight: '100vh',
	'@media': {
		'(max-width: 767px)': {
			flexDirection: 'column',
			minHeight: 'auto',
		},
	},
});

export const aspectRatioVar = createVar();

export const imageWrapper = style({
	display: 'flex',
	position: 'relative',
	width: '60%',
	minHeight: '100vh',
	backgroundColor: 'black',
	overflow: 'hidden',
	'@media': {
		'(max-width: 767px)': {
			width: '100%',
			minHeight: 'auto',
			height: '60vh',
		},
	},
});

export const image = style({
	objectFit: 'contain',
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	backgroundColor: palette.gray50,
	width: '40%',
	padding: '64px',
	justifyContent: 'center',
	'@media': {
		'(max-width: 767px)': {
			width: '100%',
			padding: '32px 24px',
		},
	},
});

export const exhibitionDate = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: '11px',
	letterSpacing: '0.15em',
	textTransform: 'uppercase',
	color: palette.gray400,
});

export const exhibitionTitle = style({
	fontFamily: 'var(--font-nanum-myeongjo)',
	fontSize: '28px',
	fontWeight: 400,
	lineHeight: 1.4,
	color: palette.gray900,
	margin: 0,
	'@media': {
		'(max-width: 767px)': {
			fontSize: '22px',
		},
	},
});

export const exhibitionDesc = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: '14px',
	lineHeight: 1.8,
	color: palette.gray500,
	margin: 0,
});

export const likesContainer = style({
	borderTopWidth: '1px',
});
