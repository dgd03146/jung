import { mediaQueries, palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	minHeight: 0,
});

export const mapToggleBar = style({
	display: 'flex',
	justifyContent: 'flex-end',
	marginBottom: '20px',
});

export const mapToggleButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '6px',
	padding: '7px 16px',
	borderRadius: '100px',
	border: `1.5px solid ${palette.gray200}`,
	backgroundColor: palette.white,
	color: palette.gray300,
	fontSize: '0.75rem',
	fontWeight: '600',
	letterSpacing: '0.04em',
	cursor: 'pointer',
	transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
	selectors: {
		'&:hover': {
			borderColor: palette.primary200,
			color: palette.primary200,
		},
	},
});

export const mapToggleButtonActive = style({
	backgroundColor: palette.primary,
	borderColor: palette.primary,
	color: palette.white,
	selectors: {
		'&:hover': {
			backgroundColor: palette.primary200,
			borderColor: palette.primary200,
		},
	},
});

export const splitContainer = style({
	display: 'grid',
	gridTemplateColumns: '1fr',
	gap: '24px',
	width: '100%',
	minHeight: 0,

	'@media': {
		[mediaQueries.tablet]: {
			gridTemplateColumns: '55fr 45fr',
			gap: '20px',
		},
	},
});

export const fullContainer = style({
	display: 'grid',
	gridTemplateColumns: '1fr',
	width: '100%',
	minHeight: 0,
});

export const listSection = style({
	minHeight: 0,
	overflowY: 'auto',

	'@media': {
		[mediaQueries.tablet]: {
			maxHeight: 'calc(100dvh - 180px)',
		},
	},
});

export const mapSection = style({
	borderRadius: '8px',
	overflow: 'hidden',
	minHeight: '400px',

	'@media': {
		[mediaQueries.tablet]: {
			position: 'sticky',
			top: '100px',
			height: 'calc(100dvh - 180px)',
		},
	},
});
