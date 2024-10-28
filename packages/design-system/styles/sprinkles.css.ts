import {
	createMapValueFn,
	createSprinkles,
	defineProperties,
} from '@vanilla-extract/sprinkles';

import { grid, lineHeights, shadows } from '../tokens';
import { getMediaQuery } from '../utils/getMediaQuery';
import { vars } from './theme.css';

export const responsiveProperties = defineProperties({
	conditions: {
		mobile: { '@media': getMediaQuery('mobile') },
		miniTablet: { '@media': getMediaQuery('miniTablet') },
		tablet: { '@media': getMediaQuery('tablet') },
		laptop: { '@media': getMediaQuery('laptop') },
		desktop: { '@media': getMediaQuery('desktop') },
		largeDesktop: { '@media': getMediaQuery('largeDesktop') },
		tv: { '@media': getMediaQuery('tv') },
	},
	defaultCondition: 'mobile',
	responsiveArray: [
		'mobile',
		'miniTablet',
		'tablet',
		'laptop',
		'desktop',
		'largeDesktop',
		'tv',
	],
	properties: {
		position: ['absolute', 'relative', 'fixed', 'sticky'],
		display: [
			'none',
			'block',
			'inline',
			'inline-block',
			'inline-flex',
			'flex',
			'grid',
		],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
		borderWidth: vars.border.width,
		borderBottomWidth: vars.border.width,
		borderLeftWidth: vars.border.width,
		borderRightWidth: vars.border.width,
		borderTopWidth: vars.border.width,
		borderRadius: vars.border.radius,
		borderBottomLeftRadius: vars.border.radius,
		borderBottomRightRadius: vars.border.radius,
		borderTopLeftRadius: vars.border.radius,
		borderTopRightRadius: vars.border.radius,
		justifyContent: [
			'flex-start',
			'center',
			'flex-end',
			'space-between',
			'space-around',
			'space-evenly',
		],
		flex: { ...vars.contentWidth },
		flexWrap: ['wrap', 'nowrap'],
		flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
		paddingTop: vars.space,
		paddingBottom: vars.space,
		paddingLeft: vars.space,
		paddingRight: vars.space,
		marginTop: vars.space,
		marginBottom: vars.space,
		marginLeft: vars.space,
		marginRight: vars.space,
		pointerEvents: ['none', 'auto'],
		overflow: ['hidden', 'auto'],
		opacity: vars.opacity,
		textAlign: ['left', 'center', 'right'],

		// grid
		gridTemplateColumns: grid.gridTemplate,
		gridTemplateRows: grid.gridTemplate,
		gridColumn: grid.gridColumnRow,
		gridRow: grid.gridColumnRow,
		gridColumnStart: grid.gridStartEnd,
		gridColumnEnd: grid.gridStartEnd,
		gridRowStart: grid.gridStartEnd,
		gridRowEnd: grid.gridStartEnd,
		gridColumnGap: vars.space,
		gridRowGap: vars.space,
		gridAutoColumns: grid.gridAuto,
		gridAutoRows: grid.gridAuto,

		columnGap: vars.space,
		rowGap: vars.space,

		lineHeight: lineHeights,

		width: vars.contentWidth,
		height: vars.space,
		minWidth: vars.contentWidth,
		maxWidth: vars.contentWidth,
		minHeight: vars.contentWidth,
		maxHeight: vars.contentWidth,
		transition: {
			slow: 'transform .3s ease, opacity .3s ease',
			fast: 'transform .15s ease, opacity .15s ease',
		},
		fontSize: { ...vars.fontSizes, inherit: 'inherit' },
	},
	shorthands: {
		gap: ['columnGap', 'rowGap'],
		padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
		paddingX: ['paddingLeft', 'paddingRight'],
		paddingY: ['paddingTop', 'paddingBottom'],
		margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
		marginX: ['marginLeft', 'marginRight'],
		marginY: ['marginTop', 'marginBottom'],
		borderLeftRadius: ['borderBottomLeftRadius', 'borderTopLeftRadius'],
		borderRightRadius: ['borderBottomRightRadius', 'borderTopRightRadius'],
		borderTopRadius: ['borderTopLeftRadius', 'borderTopRightRadius'],
		borderBottomRadius: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
	},
});

export const textProperties = defineProperties({
	properties: {
		fontWeight: vars.fontWeights,
		fontFamily: vars.fontFamily,
	},
});

export const unresponsiveProperties = defineProperties({
	properties: {
		aspectRatio: {
			auto: 'auto',
			'1/1': '1 / 1',
			'2/1': '2 / 1',
			'4/1': '4 / 1',
			'4/3': '4 / 3',
			'16/9': '16 / 9',
		},
		top: [0],
		bottom: [0],
		left: [0],
		right: [0],

		flexShrink: [0, 1],
		flexGrow: [0, 1],
		flexBasis: {
			...vars.contentWidth,
		},
		boxShadow: shadows,
		boxSizing: ['border-box', 'content-box'],
		borderStyle: ['solid', 'dotted', 'dashed', 'none', 'hidden'],
		border: ['none'],
		isolation: ['isolate'],
		pointerEvents: ['none'],

		objectFit: ['contain', 'cover'],
		outlineWidth: vars.border.width,
		borderRadius: vars.border.radius,
		borderWidth: vars.border.width,
		cursor: ['default', 'pointer', 'not-allowed'],
		textTransform: ['capitalize', 'lowercase', 'uppercase'],
		transitionProperty: {
			none: 'none',
			all: 'all',
			default:
				'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
			colors: 'background-color, border-color, color, fill, stroke',
			opacity: 'opacity',
			shadow: 'box-shadow',
			transform: 'transform',
		},
		transitionTimingFunction: {
			linear: 'linear',
			in: 'cubic-bezier(0.4, 0, 1, 1)',
			out: 'cubic-bezier(0, 0, 0.2, 1)',
			inOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
		},
		visibility: ['hidden', 'visible'],
		caretColor: ['transparent'],
		whiteSpace: [
			'normal',
			'nowrap',
			'pre',
			'pre-line',
			'pre-wrap',
			'initial',
			'inherit',
		],
		wordBreak: ['break-word'],
		wordWrap: ['normal', 'break-word', 'initial', 'inherit'],
		zIndex: {
			'0': 0,
			'10': 10,
			'20': 20,
			'30': 30,
			'40': 40,
			'50': 50,
			'75': 75,
			'100': 100,
			auto: 'auto',
		},
	},
	shorthands: {
		inset: ['top', 'bottom', 'left', 'right'],
	},
});

const motionSafeProperties = defineProperties({
	conditions: {
		base: { '@media': '(prefers-reduced-motion: no-preference)' },
	},
	defaultCondition: 'base',
	properties: {
		transitionDuration: {
			'75': '75ms',
			'100': '100ms',
			'150': '150ms',
			'200': '200ms',
			'300': '300ms',
			'500': '500ms',
			'700': '700ms',
			'1000': '1000ms',
		},
	},
});

const selectorProperties = defineProperties({
	conditions: {
		base: {},
		active: { selector: '&:active' },
		focus: { selector: '&:focus' },
		hover: { selector: '&:hover' },

		placeholder: { selector: '&::placeholder' },
	},
	defaultCondition: 'base',
	properties: {
		background: vars.palette,
		borderColor: vars.palette,
		color: vars.palette,
		outlineColor: vars.palette,
	},
});

export const mapResponsiveValue = createMapValueFn(responsiveProperties);

type ResponsivePropertiesType = typeof responsiveProperties;
type TextPropertiesType = typeof textProperties;
type UnresponsivePropertiesType = typeof unresponsiveProperties;
type MotionSafePropertiesType = typeof motionSafeProperties;
type SelectorPropertiesType = typeof selectorProperties;

type SprinklesProperties = [
	ResponsivePropertiesType,
	TextPropertiesType,
	UnresponsivePropertiesType,
	MotionSafePropertiesType,
	SelectorPropertiesType,
];

type SprinklesFnType = ReturnType<typeof createSprinkles<SprinklesProperties>>;

export const sprinkles: SprinklesFnType = createSprinkles(
	textProperties,
	responsiveProperties,
	unresponsiveProperties,
	motionSafeProperties,
	selectorProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
