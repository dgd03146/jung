import {
	createMapValueFn,
	createSprinkles,
	defineProperties,
} from '@vanilla-extract/sprinkles';

import { letterSpacings, lineHeights, shadows } from '../tokens';
import { getMediaQuery } from '../utils/getMediaQuery';
import { vars } from './theme.css';

export const responsiveProperties = defineProperties({
	conditions: {
		base: { '@media': getMediaQuery('base') },
		mobile: { '@media': getMediaQuery('mobile') },
		tablet: { '@media': getMediaQuery('tablet') },
		laptop: { '@media': getMediaQuery('laptop') },
	},
	defaultCondition: 'mobile',
	responsiveArray: ['base', 'mobile', 'tablet', 'laptop'],
	properties: {
		display: [
			'none',
			'block',
			'inline',
			'inline-block',
			'inline-flex',
			'flex',
			'grid',
		],
		flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
		flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
		justifyContent: ['flex-start', 'center', 'flex-end', 'space-between'],
		paddingTop: vars.space,
		paddingBottom: vars.space,
		paddingLeft: vars.space,
		paddingRight: vars.space,
		marginTop: vars.space,
		marginBottom: vars.space,
		marginLeft: vars.space,
		marginRight: vars.space,
		height: vars.contentWidth,
		width: vars.contentWidth,
		maxWidth: vars.contentWidth,
		minWidth: vars.contentWidth,
		minHeight: vars.contentWidth,
		gap: vars.space,

		columnGap: vars.space,
		rowGap: vars.space,
		fontSize: vars.fontSizes,
		lineHeight: lineHeights,
	},
	shorthands: {
		padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
		paddingX: ['paddingLeft', 'paddingRight'],
		paddingY: ['paddingTop', 'paddingBottom'],
		margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
		marginX: ['marginLeft', 'marginRight'],
		marginY: ['marginTop', 'marginBottom'],
	},
});

export const tokenProperties = defineProperties({
	properties: {
		color: vars.palette,
		background: vars.palette,
		borderColor: vars.palette,
		borderRadius: vars.border.radius,
		borderWidth: vars.border.width,
		boxShadow: shadows,
		fontWeight: vars.fontWeights,
		fontFamily: vars.fontFamily,
		letterSpacing: letterSpacings,
	},
});

export const unresponsiveProperties = defineProperties({
	properties: {
		position: ['absolute', 'relative', 'fixed', 'sticky'],
		flexShrink: [0, 1],
		flexGrow: [0, 1],
		flex: [1],
		borderStyle: ['solid', 'none'],
		cursor: ['default', 'pointer', 'not-allowed'],
		overflow: ['hidden', 'auto'],
		textAlign: ['left', 'center', 'right'],
		zIndex: {
			'0': 0,
			'10': 10,
			'50': 50,
			'100': 100,
			auto: 'auto',
		},
	},
});

export const mapResponsiveValue = createMapValueFn(responsiveProperties);

type SprinklesProperties = [
	typeof responsiveProperties,
	typeof tokenProperties,
	typeof unresponsiveProperties,
];

type SprinklesFnType = ReturnType<typeof createSprinkles<SprinklesProperties>>;

export const sprinkles: SprinklesFnType = createSprinkles(
	responsiveProperties,
	tokenProperties,
	unresponsiveProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
