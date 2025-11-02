import { vars } from '@jung/design-system/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const emptyCommentsContainer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: `${vars.space[8]} ${vars.space[4]}`,
	color: vars.palette.gray200,
	height: '100px',
});

export const emptyCommentsText = style({
	fontSize: vars.fontSizes.base,
	fontWeight: vars.fontWeights.medium,
});

export const emptyCommentsContent = style({
	flexDirection: 'column',
	padding: `${vars.space[8]} ${vars.space[4]}`,
	minHeight: '120px',
	textAlign: 'center',
});

export const emptyCommentsIcon = style({
	fontSize: vars.fontSizes['2xl'],
	marginBottom: vars.space[3],
	color: vars.palette.gray100,
});

export const emptyCommentsPrimaryText = style({
	fontSize: vars.fontSizes.base,
	fontWeight: vars.fontWeights.semibold,
	color: vars.palette.gray300,
	marginBottom: vars.space[1],
});

export const emptyCommentsSecondaryText = style({
	fontSize: vars.fontSizes.sm,
	fontWeight: vars.fontWeights.normal,
	color: vars.palette.gray200,
});
