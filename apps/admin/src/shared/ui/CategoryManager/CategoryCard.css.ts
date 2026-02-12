import { palette } from '@jung/design-system/tokens';
import { createVar, style } from '@vanilla-extract/css';
import { border, mutedText, subtleText } from '@/fsd/shared/styles/tokens';

export const levelIndent = createVar();
export const borderColor = createVar();

const border = 'rgba(0, 0, 0, 0.06)';
const mutedText = 'rgba(0, 0, 0, 0.45)';
const subtleText = 'rgba(0, 0, 0, 0.35)';

export const categoryCard = style({
	background: 'white',
	borderRadius: '12px',
	border: `1px solid ${border}`,
	borderTopWidth: '4px',
	borderTopStyle: 'solid',
	borderTopColor: borderColor,
	overflow: 'hidden',
	transition: 'all 0.2s ease',
	position: 'relative',
	marginLeft: levelIndent,

	':hover': {
		transform: 'translateY(-2px)',
		boxShadow: '0 8px 16px rgba(0, 0, 0, 0.06)',
	},

	vars: {
		[levelIndent]: '0px',
		[borderColor]: palette.primary,
	},
});

export const expandButton = style({
	background: 'transparent',
	border: 'none',
	padding: '4px 8px',
	cursor: 'pointer',
	color: mutedText,
	transition: 'color 0.2s ease',

	':hover': {
		color: palette.primary,
	},
});

export const parentBadge = style({
	display: 'inline-block',
	padding: '2px 6px',
	fontSize: '11px',
	fontWeight: '500',
	color: mutedText,
	background: border,
	borderRadius: '4px',
	marginLeft: '8px',
});

export const postCount = style({
	display: 'inline-flex',
	alignItems: 'center',
	height: '24px',
	padding: '0 8px',
	fontSize: '12px',
	fontWeight: '500',
	color: mutedText,
	background: border,
	borderRadius: '4px',
});

export const actions = style({
	display: 'flex',
	gap: '4px',
});

export const actionButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '28px',
	height: '28px',
	border: 'none',
	borderRadius: '6px',
	color: subtleText,
	background: 'transparent',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: border,
		color: palette.primary,
	},
});

export const dragHandle = style({
	cursor: 'grab',
	color: subtleText,
	padding: '0 8px',
	fontSize: '18px',
	display: 'flex',
	alignItems: 'center',

	':active': {
		cursor: 'grabbing',
	},
});
