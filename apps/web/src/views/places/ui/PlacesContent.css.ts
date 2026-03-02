import { mediaQueries } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	minHeight: 0,
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
