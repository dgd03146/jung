import { vars } from '@jung/design-system/styles/theme.css';
import { style } from '@vanilla-extract/css';

const borderColor = vars.palette.gray300;
const primaryLightColor = vars.palette.primary100;

export const commentContainer = style({
	borderRadius: '12px',
	border: `1px solid ${borderColor}`,
	padding: vars.space[4],
	marginBottom: vars.space[4],
	transition: 'all 0.2s ease',
	backgroundColor: vars.palette.white,
	':hover': {
		boxShadow: `0 2px 8px ${primaryLightColor}`,
	},
});

export const errorContainer = style([
	commentContainer,
	{
		margin: `${vars.space[4]} 0`,
		backgroundColor: vars.palette.white,
		border: `1px solid ${vars.palette.error}`,
		':hover': {
			boxShadow: 'none',
		},
	},
]);

export const userAvatar = style({
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `2px solid ${primaryLightColor}`,
});

export const errorAvatar = style({
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	backgroundColor: vars.palette.error,
	marginRight: vars.space[2],
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
});

export const errorIcon = style({
	color: vars.palette.white,
});

export const errorContent = style({
	marginTop: vars.space[2],
	paddingLeft: `calc(40px + ${vars.space[2]})`,
});

export const errorMessage = style({
	color: vars.palette.error,
	wordBreak: 'break-word',
});

export const retryButtonContainer = style({
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: vars.space[3],
});

export const retryButton = style({});
