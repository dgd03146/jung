import { sprinkles } from '@jung/design-system/styles';
import {
	fontFamily,
	fontSizes,
	lineHeights,
	space,
} from '@jung/design-system/tokens';
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
		maxWidth: '92%',
		paddingTop: space['8'],
		paddingBottom: space['8'],

		'@media': {
			'(max-width: 768px)': {
				paddingTop: space['8'],
				paddingBottom: space['16'],
			},
		},
	},
]);

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: space['6'],
	maxWidth: '640px',
	marginLeft: 'auto',
	marginRight: 'auto',
	textAlign: 'left',
});

export const paragraph = style({
	fontFamily: `${fontFamily.poppins}, sans-serif`,
	fontSize: fontSizes.base,
	lineHeight: lineHeights.loose,
	color: '#1a1a1a',
	wordBreak: 'keep-all',

	'@media': {
		'(max-width: 768px)': {
			fontSize: fontSizes.md,
			lineHeight: lineHeights.relaxed,
		},
	},
});
