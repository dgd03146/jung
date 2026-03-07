import { vars } from '@jung/design-system/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const errorContainer = style({
	borderRadius: '12px',
	border: '1px solid rgba(239, 68, 68, 0.15)',
	padding: `${vars.space[5]} ${vars.space[4]}`,
	margin: `${vars.space[4]} 0`,
	backgroundColor: 'rgba(239, 68, 68, 0.03)',
	textAlign: 'center',
});

export const iconWrapper = style({
	width: '36px',
	height: '36px',
	borderRadius: '10px',
	backgroundColor: 'rgba(239, 68, 68, 0.08)',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'rgba(239, 68, 68, 0.6)',
	marginBottom: vars.space[3],
});

export const errorMessage = style({
	fontSize: vars.fontSizes.xxs,
	color: vars.palette.gray200,
	marginTop: vars.space[1],
	wordBreak: 'break-word',
	fontFamily: 'monospace',
	backgroundColor: 'rgba(0, 0, 0, 0.03)',
	padding: `${vars.space[1]} ${vars.space[2]}`,
	borderRadius: '6px',
	display: 'inline-block',
});

export const retryButton = style({
	marginTop: vars.space[3],
	padding: `${vars.space[1]} ${vars.space[3]}`,
	fontSize: vars.fontSizes.xxs,
	fontWeight: vars.fontWeights.medium,
	color: 'rgba(239, 68, 68, 0.7)',
	backgroundColor: 'transparent',
	border: '1px solid rgba(239, 68, 68, 0.2)',
	borderRadius: '8px',
	cursor: 'pointer',
	transition: 'all 0.15s ease',
	':hover': {
		backgroundColor: 'rgba(239, 68, 68, 0.06)',
		borderColor: 'rgba(239, 68, 68, 0.35)',
	},
});
