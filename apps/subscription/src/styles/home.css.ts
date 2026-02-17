import { style } from '@vanilla-extract/css';

const colors = {
	primary: 'var(--color-primary)',
	primaryAlt: 'var(--color-primary-alt)',
	textDark: 'var(--color-text)',
	textMuted: 'var(--color-text-muted)',
	textLight: 'var(--color-text-light)',
	border: 'var(--color-border)',
	borderHover: 'var(--color-border-hover)',
	cardBg: 'var(--bg-card)',
	cardBgHover: 'var(--bg-card-hover)',
	filterBg: 'var(--bg-filter)',
	shadowColor: 'var(--shadow-color)',
	summaryCardBg: 'var(--bg-summary-card)',
} as const;

export const page = style({
	minHeight: '100vh',
	background:
		'linear-gradient(135deg, var(--bg-page-from) 0%, var(--bg-page-mid) 50%, var(--bg-page-from) 100%)',
	position: 'relative',
	overflow: 'hidden',
	fontFamily: "'Poppins', sans-serif",
	transition: 'background 0.3s',
});

export const gridOverlay = style({
	position: 'absolute',
	inset: 0,
	backgroundImage: `
		linear-gradient(var(--grid-color) 1px, transparent 1px),
		linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
	`,
	backgroundSize: '60px 60px',
	pointerEvents: 'none',
});

export const orbTopRight = style({
	position: 'absolute',
	top: '-20%',
	right: '-10%',
	width: '60vw',
	height: '60vw',
	maxWidth: '800px',
	maxHeight: '800px',
	background: 'radial-gradient(circle, var(--orb-color) 0%, transparent 70%)',
	filter: 'blur(60px)',
	borderRadius: '50%',
});

export const orbBottomLeft = style({
	position: 'absolute',
	bottom: '-10%',
	left: '-15%',
	width: '50vw',
	height: '50vw',
	maxWidth: '600px',
	maxHeight: '600px',
	background: 'radial-gradient(circle, var(--orb-color) 0%, transparent 70%)',
	filter: 'blur(80px)',
	borderRadius: '50%',
});

export const content = style({
	position: 'relative',
	zIndex: 1,
	minHeight: '100vh',
	display: 'grid',
	gridTemplateRows: 'auto 1fr auto',
	padding: 'clamp(1.5rem, 5vw, 3rem)',
	maxWidth: '1400px',
	margin: '0 auto',
});

export const header = style({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	gap: '1rem',
	paddingBottom: '2rem',
});

export const nav = style({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
});

export const navLink = style({
	fontSize: '0.85rem',
	color: colors.textMuted,
	textDecoration: 'none',
	fontWeight: 500,
	transition: 'color 0.2s',
});

export const main = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: '3rem',
});

export const heroSection = style({
	maxWidth: '1100px',
});

export const heroLabel = style({
	fontSize: '0.85rem',
	fontWeight: 500,
	color: colors.primaryAlt,
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	marginBottom: '1.5rem',
});

export const heroTitle = style({
	fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
	fontWeight: 700,
	color: colors.textDark,
	lineHeight: 1.1,
	margin: 0,
	letterSpacing: '-0.03em',
});

export const heroGradientText = style({
	background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryAlt} 50%, ${colors.primary} 100%)`,
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
	display: 'inline-block',
	paddingBottom: '0.1em',
});

export const heroSubtitle = style({
	fontSize: 'clamp(1rem, 2vw, 1.25rem)',
	color: colors.textMuted,
	lineHeight: 1.6,
	marginTop: '1.5rem',
	maxWidth: '700px',
});

export const subscribeSection = style({
	maxWidth: '480px',
});

export const subscribeForm = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

// TODO(human): Define the category toggle button styles.
// The active state needs a background that works in both light AND dark mode.
// Current code uses hardcoded 'white' which breaks in dark mode.
// Consider: var(--bg-card-hover) or a new --bg-toggle-active variable.
// See the filterToggleContainer, filterToggleButton, and filterToggleButtonActive
// exports below — fill in the style objects.

export const filterToggleContainer = style({
	display: 'flex',
	gap: '0.5rem',
	padding: '0.25rem',
	background: colors.filterBg,
	backdropFilter: 'blur(10px)',
	borderRadius: '12px',
	width: 'fit-content',
});

export const filterToggleButton = style({
	padding: '0.5rem 1rem',
	background: 'transparent',
	border: 'none',
	borderRadius: '8px',
	fontSize: '0.8rem',
	fontWeight: 500,
	fontFamily: "'Poppins', sans-serif",
	color: colors.textMuted,
	cursor: 'pointer',
	transition: 'all 0.2s',
});

export const filterToggleButtonActive = style({
	background: colors.cardBgHover,
	boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
});

export const emailFormWrapper = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	padding: '0.5rem 0.5rem 0.5rem 1.5rem',
	background: colors.summaryCardBg,
	backdropFilter: 'blur(20px)',
	borderRadius: '16px',
	border: `1px solid ${colors.borderHover}`,
	boxShadow: `0 8px 32px ${colors.shadowColor}`,
	transition: 'all 0.3s ease',
});

export const emailInput = style({
	flex: 1,
	border: 'none',
	background: 'transparent',
	fontSize: '0.95rem',
	color: colors.textDark,
	outline: 'none',
	minWidth: '180px',
	fontFamily: "'Poppins', sans-serif",
});

export const submitButton = style({
	padding: '0.875rem 1.5rem',
	background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryAlt} 100%)`,
	color: 'white',
	border: 'none',
	borderRadius: '12px',
	fontSize: '0.9rem',
	fontWeight: 600,
	fontFamily: "'Poppins', sans-serif",
	cursor: 'pointer',
	whiteSpace: 'nowrap',
	transition: 'transform 0.2s, box-shadow 0.2s',
	boxShadow: `0 4px 14px ${colors.shadowColor}`,
	':hover': {
		transform: 'translateY(-1px)',
		boxShadow: `0 6px 20px ${colors.shadowColor}`,
	},
	':disabled': {
		cursor: 'not-allowed',
		opacity: 0.7,
	},
});

export const formHint = style({
	fontSize: '0.8rem',
	color: colors.textLight,
	paddingLeft: '0.25rem',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingTop: '2rem',
	borderTop: `1px solid ${colors.border}`,
});

export const footerText = style({
	fontSize: '0.8rem',
	color: colors.textLight,
});

export const footerLink = style({
	fontSize: '0.8rem',
	color: colors.textMuted,
	textDecoration: 'none',
});
