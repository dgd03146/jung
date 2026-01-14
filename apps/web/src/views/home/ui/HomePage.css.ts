import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style([
	sprinkles({
		marginX: 'auto',
		width: {
			base: 'tablet',
			tablet: 'tablet',
			laptop: 'laptop',
		},
	}),
	{
		display: 'grid',
		gridTemplateColumns: '1fr auto',
		gridTemplateRows: '1fr',
		minHeight: 'calc(100dvh - 4.5rem)',
		maxWidth: '92%',

		'@media': {
			'(max-width: 768px)': {
				gridTemplateColumns: '1fr',
				gridTemplateRows: '1fr auto',
			},
		},
	},
]);

export const main = style({
	display: 'flex',
	alignItems: 'flex-end',
});

export const heroText = style({
	lineHeight: 0.82,
	fontWeight: 900,
	letterSpacing: '-0.06em',
	color: '#FFFFFF',
	fontSize: 'clamp(80px, 15vw, 200px)',
	fontFamily: 'var(--font-poppins), sans-serif',
	userSelect: 'none',

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
			gridRow: '2',
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
