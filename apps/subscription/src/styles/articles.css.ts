import { keyframes, style } from '@vanilla-extract/css';

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

export const orb = style({
	position: 'absolute',
	top: '10%',
	right: '-20%',
	width: '50vw',
	height: '50vw',
	maxWidth: '600px',
	maxHeight: '600px',
	background: 'radial-gradient(circle, var(--orb-color) 0%, transparent 70%)',
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
	background: 'radial-gradient(circle, var(--orb-color) 0%, transparent 70%)',
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
	background: 'var(--bg-card-hover)',
	color: colors.primary,
	boxShadow: '0 2px 8px var(--shadow-color)',
});

export const filterButtonActiveAi = style({
	background: 'var(--bg-card-hover)',
	color: colors.primaryAlt,
	boxShadow: '0 2px 8px var(--shadow-color)',
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
		boxShadow: '0 12px 40px rgba(1, 66, 192, 0.1)',
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

const spin = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
});

export const loadingContainer = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '1.25rem',
	padding: '4rem 2rem',
});

export const spinner = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	border: `3px solid ${colors.border}`,
	borderTopColor: colors.primary,
	animation: `${spin} 0.8s linear infinite`,
});

export const loadingText = style({
	fontSize: '0.85rem',
	color: colors.textLight,
});

export const errorActions = style({
	display: 'flex',
	gap: '1rem',
	justifyContent: 'center',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	paddingTop: '3rem',
	marginTop: '3rem',
	borderTop: `1px solid ${colors.border}`,
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
	background:
		'linear-gradient(135deg, var(--bg-page-from) 0%, var(--bg-page-mid) 50%, var(--bg-page-from) 100%)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontFamily: "'Poppins', sans-serif",
	transition: 'background 0.3s',
});

export const centeredContent = style({
	textAlign: 'center',
});

export const emptyStateIcon = style({
	fontSize: '3rem',
	lineHeight: 1,
	marginBottom: '1rem',
	opacity: 0.6,
});

export const emptyStateHeading = style({
	fontSize: '1.25rem',
	fontWeight: 600,
	color: colors.textDark,
	margin: 0,
	marginBottom: '0.5rem',
});

export const emptyStateText = style({
	fontSize: '0.9rem',
	color: colors.textMuted,
	margin: 0,
	marginBottom: '1.5rem',
	lineHeight: 1.5,
});

export const notFoundHeading = style({
	fontSize: '1.5rem',
	fontWeight: 600,
	color: colors.textDark,
	marginBottom: '1rem',
});

export const card = style({
	padding: '1.5rem',
	background: 'var(--bg-summary-card)',
	backdropFilter: 'blur(20px)',
	borderRadius: '16px',
	borderLeft: `3px solid ${colors.primary}`,
	marginBottom: '1.5rem',
});

export const cardAlt = style({
	padding: '1.5rem',
	background: 'var(--bg-summary-card-alt)',
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
	color: colors.textMuted,
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
	boxShadow: '0 4px 14px var(--shadow-color)',
	':hover': {
		transform: 'translateY(-1px)',
		boxShadow: '0 6px 20px var(--shadow-color)',
	},
});

export const linkUnstyled = style({
	textDecoration: 'none',
});

export const articleThumbnail = style({
	width: '64px',
	height: '64px',
	borderRadius: '10px',
	objectFit: 'cover',
	flexShrink: 0,
});

export const imageGallery = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	marginBottom: '2rem',
});

export const galleryImage = style({
	width: '100%',
	borderRadius: '12px',
	objectFit: 'cover',
	maxHeight: '400px',
});

// Search
export const searchContainer = style({
	position: 'relative',
	marginBottom: '2rem',
});

export const searchInput = style({
	width: '100%',
	padding: '0.875rem 1rem 0.875rem 2.75rem',
	background: colors.filterBg,
	backdropFilter: 'blur(10px)',
	border: `1px solid ${colors.border}`,
	borderRadius: '12px',
	fontSize: '0.9rem',
	color: colors.textDark,
	fontFamily: "'Poppins', sans-serif",
	outline: 'none',
	transition: 'all 0.2s',
	':focus': {
		borderColor: colors.borderHover,
		background: colors.cardBgHover,
		boxShadow: '0 4px 12px rgba(1, 66, 192, 0.08)',
	},
	'::placeholder': {
		color: colors.textLight,
	},
});

export const searchIcon = style({
	position: 'absolute',
	left: '1rem',
	top: '50%',
	transform: 'translateY(-50%)',
	color: colors.textLight,
	pointerEvents: 'none',
});

// Pagination
export const paginationContainer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '1.5rem',
	marginTop: '2.5rem',
	paddingTop: '1.5rem',
});

export const paginationButton = style({
	padding: '0.625rem 1.25rem',
	background: colors.filterBg,
	backdropFilter: 'blur(10px)',
	border: `1px solid ${colors.border}`,
	borderRadius: '10px',
	fontSize: '0.85rem',
	fontWeight: 500,
	fontFamily: "'Poppins', sans-serif",
	color: colors.primary,
	cursor: 'pointer',
	transition: 'all 0.2s',
	':hover': {
		background: colors.cardBgHover,
		borderColor: colors.borderHover,
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 12px rgba(1, 66, 192, 0.1)',
	},
	':disabled': {
		opacity: 0.4,
		cursor: 'not-allowed',
		transform: 'none',
		boxShadow: 'none',
	},
});

export const paginationInfo = style({
	fontSize: '0.8rem',
	color: colors.textLight,
	fontVariantNumeric: 'tabular-nums',
});

// Related Articles
export const relatedSection = style({
	marginTop: '3rem',
	paddingTop: '2rem',
	borderTop: `1px solid ${colors.border}`,
});

export const relatedHeading = style({
	fontSize: '0.85rem',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	color: colors.textMuted,
	marginBottom: '1.25rem',
});

export const relatedGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '1rem',
});

export const relatedCard = style({
	padding: '1.25rem',
	background: colors.cardBg,
	backdropFilter: 'blur(20px)',
	borderRadius: '12px',
	border: `1px solid ${colors.border}`,
	transition: 'all 0.2s ease',
	':hover': {
		background: colors.cardBgHover,
		transform: 'translateY(-2px)',
		boxShadow: '0 8px 24px rgba(1, 66, 192, 0.1)',
		borderColor: colors.borderHover,
	},
});

export const relatedCardCategory = style({
	fontSize: '0.65rem',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
	marginBottom: '0.5rem',
});

export const relatedCardTitle = style({
	fontSize: '0.9rem',
	fontWeight: 600,
	color: colors.textDark,
	margin: 0,
	lineHeight: 1.3,
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
});
