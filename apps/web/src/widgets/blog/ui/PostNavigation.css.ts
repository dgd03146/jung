import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const linkText = style({
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.02em',
});

export const sidebar = style({
	'@media': {
		'(min-width: 1024px)': {
			minHeight: calc.subtract('100dvh', '144px'),
			width: '240px',
			minWidth: 0,
			flexShrink: 0,
		},
	},
});

export const sidebarContainer = style({
	'@media': {
		'(min-width: 1024px)': {
			top: 80,
			position: 'sticky',
			maxWidth: '100%',
			overflow: 'hidden',
		},
	},
});
export const minWidth = style({
	'@media': {
		'(min-width: 1024px)': {
			minWidth: '240px',
		},
	},
});

export const sidebarHeader = style({
	fontFamily: 'var(--font-bebas)',
	marginBottom: '8px',
	letterSpacing: '0.02em',
});

export const transitionColor = style({
	transition: 'color 0.15s ease',
});

export const hoverColor = style({
	':hover': {
		color: palette.primary200,
	},
});

export const SocialIconContainer = style([
	transitionColor,
	hoverColor,
	{
		color: palette.primary,
	},
]);

export const backButton = style({
	position: 'relative',
	overflow: 'hidden',
	transition: 'all 0.3s ease',
	fontFamily: 'var(--font-bebas)',
	color: palette.primary,

	':before': {
		content: '',
		position: 'absolute',
		left: '-100%',
		top: 0,
		width: '100%',
		height: '100%',
		transition: 'all 0.3s ease',
		zIndex: -1,
	},

	':hover': {
		transform: 'translateX(5px)',
		color: palette.primary200,
	},
});

export const tagsContainer = style([
	minWidth,
	{
		'@media': {
			'(min-width: 1024px)': {
				borderTopWidth: '1px',
				borderBottomWidth: '1px',
			},
		},
	},
]);

export const adjacentPostContainer = style([tagsContainer]);

export const adjacentPostTitle = style([transitionColor, hoverColor]);
