import { style } from '@vanilla-extract/css';

const colors = {
	primary: '#6366f1',
	primaryAlt: '#8b5cf6',
	textDark: '#1e293b',
	textMuted: '#64748b',
	textLight: '#94a3b8',
	border: 'rgba(139, 92, 246, 0.08)',
	borderHover: 'rgba(139, 92, 246, 0.15)',
	cardBg: 'rgba(255, 255, 255, 0.6)',
	cardBgHover: 'rgba(255, 255, 255, 0.85)',
	filterBg: 'rgba(255, 255, 255, 0.5)',
} as const;

export const page = style({
	minHeight: '100vh',
	background: 'linear-gradient(135deg, #e8efff 0%, #f0e8ff 50%, #e8f4ff 100%)',
	position: 'relative',
	overflow: 'hidden',
	fontFamily: "'Poppins', sans-serif",
});

export const gridOverlay = style({
	position: 'absolute',
	inset: 0,
	backgroundImage: `
		linear-gradient(rgba(120, 120, 180, 0.03) 1px, transparent 1px),
		linear-gradient(90deg, rgba(120, 120, 180, 0.03) 1px, transparent 1px)
	`,
	backgroundSize: '60px 60px',
	pointerEvents: 'none',
});

export const orb = style({
	position: 'absolute',
	top: '10%',
	right: '-20%',
	width: '50vw',
	height: '50vw',
	maxWidth: '600px',
	maxHeight: '600px',
	background:
		'radial-gradient(circle, rgba(147, 112, 219, 0.12) 0%, transparent 70%)',
	filter: 'blur(80px)',
	borderRadius: '50%',
});

export const orbSmall = style({
	position: 'absolute',
	top: '20%',
	right: '-15%',
	width: '40vw',
	height: '40vw',
	maxWidth: '500px',
	maxHeight: '500px',
	background:
		'radial-gradient(circle, rgba(147, 112, 219, 0.1) 0%, transparent 70%)',
	filter: 'blur(60px)',
	borderRadius: '50%',
});

export const contentContainer = style({
	position: 'relative',
	zIndex: 1,
	minHeight: '100vh',
	display: 'grid',
	gridTemplateRows: 'auto 1fr auto',
	padding: 'clamp(1.5rem, 5vw, 3rem)',
	maxWidth: '900px',
	margin: '0 auto',
});

export const contentContainerNarrow = style({
	position: 'relative',
	zIndex: 1,
	minHeight: '100vh',
	display: 'grid',
	gridTemplateRows: 'auto 1fr auto',
	padding: 'clamp(1.5rem, 5vw, 3rem)',
	maxWidth: '750px',
	margin: '0 auto',
});

export const header = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingBottom: '3rem',
});

export const backLink = style({
	fontSize: '0.85rem',
	color: colors.primary,
	textDecoration: 'none',
	fontWeight: 500,
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
});

export const headerMeta = style({
	fontSize: '0.8rem',
	color: colors.textLight,
});

export const titleSection = style({
	marginBottom: '3rem',
});

export const titleSectionDetail = style({
	marginBottom: '2.5rem',
});

export const label = style({
	fontSize: '0.85rem',
	fontWeight: 500,
	color: colors.primaryAlt,
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	marginBottom: '1rem',
});

export const labelSmall = style({
	display: 'inline-block',
	fontSize: '0.75rem',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	marginBottom: '1rem',
});

export const title = style({
	fontSize: 'clamp(2rem, 6vw, 3.5rem)',
	fontWeight: 700,
	color: colors.textDark,
	lineHeight: 1.1,
	margin: 0,
	letterSpacing: '-0.02em',
});

export const titleDetail = style({
	fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
	fontWeight: 700,
	color: colors.textDark,
	lineHeight: 1.2,
	margin: 0,
	letterSpacing: '-0.02em',
});

export const subtitle = style({
	fontSize: '1rem',
	color: colors.textMuted,
	marginTop: '1rem',
	maxWidth: '400px',
});

export const filterContainer = style({
	display: 'flex',
	gap: '0.5rem',
	marginTop: '1.5rem',
	padding: '0.25rem',
	background: colors.filterBg,
	backdropFilter: 'blur(10px)',
	borderRadius: '12px',
	width: 'fit-content',
});

export const filterButton = style({
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

export const filterButtonActive = style({
	background: 'white',
	color: colors.primary,
	boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
});

export const filterButtonActiveAi = style({
	background: 'white',
	color: colors.primaryAlt,
	boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
});

export const articleList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const articleCard = style({
	padding: '1.5rem',
	background: colors.cardBg,
	backdropFilter: 'blur(20px)',
	borderRadius: '16px',
	border: `1px solid ${colors.border}`,
	transition: 'all 0.3s ease',
	cursor: 'pointer',
	display: 'grid',
	gridTemplateColumns: 'auto 1fr auto',
	gap: '1.5rem',
	alignItems: 'center',
	':hover': {
		background: colors.cardBgHover,
		transform: 'translateY(-2px)',
		boxShadow: '0 12px 40px rgba(99, 102, 241, 0.1)',
		borderColor: colors.borderHover,
	},
});

export const articleNumber = style({
	fontSize: '0.8rem',
	fontWeight: 600,
	color: colors.textLight,
	fontVariantNumeric: 'tabular-nums',
});

export const articleMeta = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
	marginBottom: '0.5rem',
});

export const categoryBadge = style({
	fontSize: '0.7rem',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
});

export const categoryFrontend = style({
	color: colors.primary,
});

export const categoryAi = style({
	color: colors.primaryAlt,
});

export const articleDate = style({
	fontSize: '0.75rem',
	color: colors.textLight,
});

export const articleTitle = style({
	fontSize: '1.1rem',
	fontWeight: 600,
	color: colors.textDark,
	margin: 0,
	marginBottom: '0.25rem',
});

export const articleSummary = style({
	fontSize: '0.85rem',
	color: colors.textMuted,
	margin: 0,
});

export const articleArrow = style({
	fontSize: '1.25rem',
	color: colors.textLight,
	transition: 'transform 0.2s, color 0.2s',
});

export const loadingContainer = style({
	textAlign: 'center',
	padding: '2rem',
});

export const loadingText = style({
	color: colors.textMuted,
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	paddingTop: '3rem',
	marginTop: '3rem',
	borderTop: '1px solid rgba(148, 163, 184, 0.1)',
});

export const footerNoBorder = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	paddingTop: '3rem',
	marginTop: '3rem',
});

export const footerText = style({
	fontSize: '0.8rem',
	color: colors.textLight,
});

export const centeredPage = style({
	minHeight: '100vh',
	background: 'linear-gradient(135deg, #e8efff 0%, #f0e8ff 50%, #e8f4ff 100%)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontFamily: "'Poppins', sans-serif",
});

export const centeredContent = style({
	textAlign: 'center',
});

export const notFoundHeading = style({
	fontSize: '1.5rem',
	fontWeight: 600,
	color: colors.textDark,
	marginBottom: '1rem',
});

export const card = style({
	padding: '1.5rem',
	background: 'rgba(255, 255, 255, 0.7)',
	backdropFilter: 'blur(20px)',
	borderRadius: '16px',
	borderLeft: `3px solid ${colors.primary}`,
	marginBottom: '1.5rem',
});

export const cardAlt = style({
	padding: '1.5rem',
	background: 'rgba(255, 255, 255, 0.5)',
	backdropFilter: 'blur(20px)',
	borderRadius: '16px',
	marginBottom: '2.5rem',
});

export const cardLabel = style({
	fontSize: '0.75rem',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	margin: 0,
	marginBottom: '0.75rem',
});

export const cardLabelPrimary = style({
	color: colors.primary,
});

export const cardLabelAlt = style({
	color: colors.primaryAlt,
});

export const cardText = style({
	fontSize: '1rem',
	color: '#475569',
	lineHeight: 1.7,
	margin: 0,
});

export const cardTextDark = style({
	fontSize: '1rem',
	color: colors.textDark,
	lineHeight: 1.7,
	margin: 0,
});

export const primaryButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '0.5rem',
	padding: '0.875rem 1.5rem',
	background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryAlt} 100%)`,
	borderRadius: '12px',
	color: 'white',
	fontWeight: 600,
	fontSize: '0.9rem',
	textDecoration: 'none',
	fontFamily: "'Poppins', sans-serif",
	transition: 'all 0.2s',
	boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
	':hover': {
		transform: 'translateY(-1px)',
		boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
	},
});

export const linkUnstyled = style({
	textDecoration: 'none',
});
