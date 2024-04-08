import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { breakpoints } from "../tokens";
import { vars } from "./theme.css";

export const responsiveProperties = defineProperties({
	conditions: {
		sm: { "@media": `screen and (min-width: ${breakpoints.sm})` },
		md: { "@media": `screen and (min-width: ${breakpoints.sm})` },
		lg: { "@media": `screen and (min-width: ${breakpoints.sm})` },
		xl: { "@media": `screen and (min-width: ${breakpoints.sm})` },
		"2xl": { "@media": `screen and (min-width: ${breakpoints.sm})` },
	},
	defaultCondition: "sm",
	responsiveArray: ["sm", "md", "lg", "xl", "2xl"],
	properties: {
		position: ["absolute", "relative", "fixed", "sticky"],
		display: ["none", "block", "inline", "inline-block", "flex", "grid"],
		alignItems: ["stretch", "flex-start", "center", "flex-end"],
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
			"flex-start",
			"center",
			"flex-end",
			"space-between",
			"space-around",
			"space-evenly",
		],
		flexWrap: ["wrap", "nowrap"],
		flexDirection: ["row", "row-reverse", "column", "column-reverse"],
		paddingTop: vars.space,
		paddingBottom: vars.space,
		paddingLeft: vars.space,
		paddingRight: vars.space,
		marginTop: vars.space,
		marginBottom: vars.space,
		marginLeft: vars.space,
		marginRight: vars.space,
		pointerEvents: ["none", "auto"],
		overflow: ["hidden"],
		opacity: vars.opacity,
		textAlign: ["left", "center", "right"],
		gridTemplateColumns: {
			"1/2": "repeat(2, 1fr)",
			"1/4": "repeat(4, 1fr)",
			"1/6": "repeat(6, 1fr)",
			"1/8": "repeat(8, 1fr)",
			"1/12": "repeat(12, 1fr)",
			"1/5": "repeat(5, 1fr)",
		},
		gridColumn: {
			"1/2": "1/2",
			"1/3": "1/3",
			"1/7": "1/7",
			"1/8": "1/8",
			"1/9": "1/9",
			"1/13": "1/13",
			auto: "auto",
		},

		columnGap: vars.space,
		rowGap: vars.space,
		gridColumnGap: vars.space,
		width: vars.contentWidth,
		height: vars.space,
		minWidth: vars.contentWidth,
		maxWidth: vars.contentWidth,
		minHeight: vars.contentWidth,
		maxHeight: vars.contentWidth,
		transition: {
			slow: "transform .3s ease, opacity .3s ease",
			fast: "transform .15s ease, opacity .15s ease",
		},
		fontSize: { ...vars.fontSizes, inherit: "inherit" },
	},
	shorthands: {
		padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
		paddingX: ["paddingLeft", "paddingRight"],
		paddingY: ["paddingTop", "paddingBottom"],
		margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
		marginX: ["marginLeft", "marginRight"],
		marginY: ["marginTop", "marginBottom"],
		borderLeftRadius: ["borderBottomLeftRadius", "borderTopLeftRadius"],
		borderRightRadius: ["borderBottomRightRadius", "borderTopRightRadius"],
		borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"],
		borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"],
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
			auto: "auto",
			"1/1": "1 / 1",
			"2/1": "2 / 1",
			"4/1": "4 / 1",
			"4/3": "4 / 3",
			"16/9": "16 / 9",
		},
		top: [0],
		bottom: [0],
		left: [0],
		right: [0],
		flexShrink: [0],
		flexGrow: [0, 1],
		flexBasis: {
			...vars.contentWidth,
		},
		boxSizing: ["border-box", "content-box"],
		borderStyle: ["solid", "dotted", "dashed", "none", "hidden"],
		border: ["none"],
		isolation: ["isolate"],
		pointerEvents: ["none"],
		objectFit: ["contain", "cover"],
		borderRadius: vars.border.radius,
		borderWidth: vars.border.width,
		cursor: ["default", "pointer", "not-allowed"],
		textTransform: ["capitalize", "lowercase", "uppercase"],
		transitionProperty: {
			none: "none",
			all: "all",
			default:
				"background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
			colors: "background-color, border-color, color, fill, stroke",
			opacity: "opacity",
			shadow: "box-shadow",
			transform: "transform",
		},
		transitionTimingFunction: {
			linear: "linear",
			in: "cubic-bezier(0.4, 0, 1, 1)",
			out: "cubic-bezier(0, 0, 0.2, 1)",
			inOut: "cubic-bezier(0.42, 0, 0.58, 1)",
		},
		visibility: ["hidden", "visible"],
		caretColor: ["transparent"],
		whiteSpace: [
			"normal",
			"nowrap",
			"pre",
			"pre-line",
			"pre-wrap",
			"initial",
			"inherit",
		],
		wordBreak: ["break-word"],
		wordWrap: ["normal", "break-word", "initial", "inherit"],
		zIndex: {
			"0": 0,
			"10": 10,
			"20": 20,
			"30": 30,
			"40": 40,
			"50": 50,
			"75": 75,
			"100": 100,
			auto: "auto",
		},
	},
	shorthands: {
		inset: ["top", "bottom", "left", "right"],
	},
});

const motionSafeProperties = defineProperties({
	conditions: {
		base: { "@media": "(prefers-reduced-motion: no-preference)" },
	},
	defaultCondition: "base",
	properties: {
		transitionDuration: {
			"75": "75ms",
			"100": "100ms",
			"150": "150ms",
			"200": "200ms",
			"300": "300ms",
			"500": "500ms",
			"700": "700ms",
			"1000": "1000ms",
		},
	},
});

const selectorProperties = defineProperties({
	conditions: {
		base: {},
		active: { selector: "&:active" },
		focus: { selector: "&:focus" },
		hover: { selector: "&:hover" },
	},
	defaultCondition: "base",
	properties: {
		background: vars.palette,
		borderColor: vars.palette,
		color: vars.palette,
		outlineColor: vars.palette,
	},
});

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
