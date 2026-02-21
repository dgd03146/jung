import { style } from '@vanilla-extract/css';
import { colors, FONT_HEADING } from './tokens';

export { gridOverlay, page } from './layout.css';

export const orb = style({
	position: 'absolute',
	bottom: '-20%',
	right: '-10%',
	width: '50vw',
	height: '50vw',
	maxWidth: '500px',
	maxHeight: '500px',
	background: 'radial-gradient(circle, var(--orb-color) 0%, transparent 70%)',
	filter: 'blur(80px)',
	borderRadius: '50%',
});

export const content = style({
	position: 'relative',
	zIndex: 1,
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 'clamp(1.5rem, 5vw, 3rem)',
});

export const card = style({
	width: '100%',
	maxWidth: '400px',
	textAlign: 'center',
});

export const successIcon = style({
	width: '64px',
	height: '64px',
	margin: '0 auto 1.5rem',
	borderRadius: '50%',
	background: colors.summaryCardBg,
	backdropFilter: 'blur(20px)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '1.5rem',
	border: `1px solid ${colors.borderHover}`,
});

export const heading = style({
	fontSize: '1.5rem',
	fontWeight: 700,
	color: colors.textDark,
	marginBottom: '0.5rem',
});

export const headingSuccess = style({
	marginBottom: '0.75rem',
});

export const description = style({
	color: colors.textMuted,
	fontSize: '0.95rem',
	marginBottom: '2rem',
	lineHeight: 1.6,
});

export const backLink = style({
	color: colors.primary,
	fontWeight: 600,
	fontSize: '0.9rem',
	textDecoration: 'none',
});

export const formCard = style({
	padding: '1.5rem',
	background: colors.summaryCardBg,
	backdropFilter: 'blur(20px)',
	borderRadius: '16px',
	border: `1px solid ${colors.border}`,
	marginBottom: '1rem',
});

export const emailInput = style({
	width: '100%',
	padding: '0.875rem 1rem',
	border: `1px solid ${colors.borderHover}`,
	borderRadius: '12px',
	fontSize: '0.95rem',
	marginBottom: '1rem',
	background: colors.cardBgHover,
	color: colors.textDark,
	fontFamily: FONT_HEADING,
	transition: 'border-color 0.2s',
	':focus-visible': {
		borderColor: colors.borderFocus,
	},
});

export const submitButton = style({
	width: '100%',
	padding: '0.875rem 1.5rem',
	background: colors.danger,
	color: 'white',
	border: 'none',
	borderRadius: '12px',
	fontSize: '0.9rem',
	fontWeight: 600,
	fontFamily: FONT_HEADING,
	cursor: 'pointer',
	transition: 'all 0.2s',
	':hover': {
		background: colors.dangerHover,
		transform: 'translateY(-1px)',
	},
	':disabled': {
		cursor: 'not-allowed',
		opacity: 0.7,
	},
});

export const errorText = style({
	color: colors.danger,
	fontSize: '0.85rem',
	marginTop: '0.5rem',
});

export const cancelLink = style({
	display: 'inline-block',
	color: colors.textMuted,
	fontSize: '0.85rem',
	textDecoration: 'none',
});
