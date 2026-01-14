import { sprinkles } from '@jung/design-system/styles';
import {
	fontFamily,
	fontSizes,
	fontWeights,
	mediaQueries,
	palette,
	space,
} from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { HEADER_HEIGHT } from '@/fsd/widgets/Header/ui/Navbar.css';

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
		minHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
		maxWidth: '92%',

		'@media': {
			[mediaQueries.tablet]: {
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
	fontWeight: fontWeights.black,
	letterSpacing: '-0.06em',
	color: palette.white,
	fontSize: 'clamp(80px, 15vw, 200px)',
	fontFamily: `${fontFamily.poppins}, sans-serif`,
	userSelect: 'none',

	'@media': {
		[mediaQueries.tablet]: {
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
	gap: space['8'],
	textAlign: 'right',
	paddingBottom: space['4'],

	'@media': {
		[mediaQueries.tablet]: {
			gridRow: '2',
			flexDirection: 'row',
			textAlign: 'left',
			gap: space['8'],
			paddingTop: space['8'],
			flexWrap: 'wrap',
		},
	},
});

export const infoBlock = style({
	display: 'flex',
	flexDirection: 'column',
	gap: space['1'],
});

export const label = style({
	fontSize: fontSizes.xxxs,
	fontWeight: fontWeights.medium,
	color: 'rgba(255, 255, 255, 0.5)',
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
});

export const value = style({
	fontSize: fontSizes.xxs,
	fontWeight: fontWeights.medium,
	color: palette.white,
	lineHeight: 1.4,
});
