import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import {
	hoverBg,
	notionSecondary,
	notionText,
	subtleText,
} from '@/fsd/shared/styles/tokens';

export const titleSection = style({
	borderBottomWidth: '1px',
});

export const titleInput = style({
	width: '100%',
	fontSize: '28px',
	fontWeight: '700',
	color: notionText,
	border: 'none',
	outline: 'none',

	background: 'transparent',
	caretColor: palette.primary,
	fontFamily: 'inherit',
	lineHeight: '1.2',

	'::placeholder': {
		color: subtleText,
	},

	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '32px',
		},
	},
});

export const descriptionInput = style({
	width: '100%',
	fontSize: '16px',
	color: notionSecondary,
	border: 'none',
	outline: 'none',

	background: 'transparent',
	caretColor: palette.primary,
	fontFamily: 'inherit',
	lineHeight: '1.5',

	'::placeholder': {
		color: subtleText,
	},

	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '14px',
		},
	},
});

export const fieldContainer = style({
	flex: 1,
	position: 'relative',
});

export const tagInputContainer = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '6px',
	padding: '0 12px',
	borderRadius: '6px',
	width: '100%',

	minHeight: '40px',
	alignItems: 'center',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: palette.primary,
		backgroundColor: hoverBg,
	},

	':focus-within': {
		borderColor: palette.primary,
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},
});

export const inlineTagInput = style({
	border: 'none',
	outline: 'none',
	padding: '0',
	margin: '0',
	fontSize: '14px',
	backgroundColor: 'transparent',
	color: notionText,
	flex: '1',
	minWidth: '60px',

	'::placeholder': {
		color: subtleText,
	},
});

export const removeTag = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: 'none',
	background: 'none',
	color: palette.primary,
	cursor: 'pointer',
	padding: '0 2px',
	fontSize: '14px',
	opacity: 0.8,
	width: '16px',
	height: '16px',
	borderRadius: '50%',

	':hover': {
		opacity: 1,
		backgroundColor: 'rgba(1, 66, 192, 0.08)',
	},
});

export const selectWrapper = style({
	position: 'relative',
	width: '100%',
});

export const select = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	fontSize: '14px',
	color: notionText,
	backgroundColor: 'white',
	borderRadius: '6px',
	outline: 'none',
	cursor: 'pointer',
	appearance: 'none',
	transition: 'all 0.2s ease',

	':hover': {
		borderColor: palette.primary,
		backgroundColor: hoverBg,
	},

	':focus': {
		borderColor: palette.primary,
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},

	'::placeholder': {
		color: subtleText,
	},
});
