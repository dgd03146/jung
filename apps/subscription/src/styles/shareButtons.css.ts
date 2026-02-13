import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const colors = {
	border: 'rgba(1, 66, 192, 0.08)',
	borderHover: 'rgba(1, 66, 192, 0.15)',
	cardBg: 'rgba(255, 255, 255, 0.5)',
	textMuted: palette.gray300,
} as const;

export const container = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	marginBottom: '1.5rem',
});

export const label = style({
	fontSize: '0.75rem',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	color: colors.textMuted,
	marginRight: '0.25rem',
});

export const srOnly = style({
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: 0,
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: 0,
});

export const button = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '36px',
	height: '36px',
	borderRadius: '10px',
	border: `1px solid ${colors.border}`,
	background: colors.cardBg,
	backdropFilter: 'blur(10px)',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	color: colors.textMuted,
	padding: 0,
	':hover': {
		background: 'rgba(255, 255, 255, 0.8)',
		borderColor: colors.borderHover,
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 12px rgba(1, 66, 192, 0.1)',
		color: palette.primary,
	},
});
