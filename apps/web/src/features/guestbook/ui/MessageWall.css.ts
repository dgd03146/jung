import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const PRIMARY_COLOR = '#0142C0';
const PRIMARY_LIGHT = '#E5EDFF';

const sparkleAnimation = keyframes({
	'0%': { opacity: 1, transform: 'rotate(-5deg) scale(1)' },
	'50%': { opacity: 0.7, transform: 'rotate(5deg) scale(0.95)' },
	'100%': { opacity: 1, transform: 'rotate(-5deg) scale(1)' },
});

export const messageWallContainer = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
	gap: '1.25rem',
	padding: '1rem 0',

	margin: '0 auto',
});

export const messageCard = recipe({
	base: {
		borderRadius: '16px',
		padding: '1rem',
		boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
		transition: 'all 0.2s ease',
		border: '1px solid #F0F0F0',
		position: 'relative',
		height: '100%',

		':hover': {
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
			borderColor: PRIMARY_LIGHT,
		},
	},
	variants: {
		backgroundColor: {
			'#FFFFFF': { backgroundColor: '#FFFFFF' },
			'#FFF3E0': { backgroundColor: '#FFF3E0' },
			'#E8F5E9': { backgroundColor: '#E8F5E9' },
			'#E3F2FD': { backgroundColor: '#E3F2FD' },
			'#F3E5F5': { backgroundColor: '#F3E5F5' },
			'#FFF8E1': { backgroundColor: '#FFF8E1' },
			'#E0F7FA': { backgroundColor: '#E0F7FA' },
		},
	},
	defaultVariants: {
		backgroundColor: '#FFFFFF',
	},
});

export const messageHeader = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
	marginBottom: '1rem',
});

export const avatar = style({
	width: '36px',
	height: '36px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `1.5px solid ${PRIMARY_LIGHT}`,
});

export const authorInfo = style({
	flex: 1,
	minWidth: 0,
});

export const authorName = style({
	fontSize: '0.925rem',
	fontWeight: '600',
	color: '#1F2937',
	marginBottom: '0.125rem',
	fontFamily: "'Inter', sans-serif",
});

export const messageDate = style({
	fontSize: '0.75rem',
	color: '#9CA3AF',
	fontFamily: "'Inter', sans-serif",
});

export const messageEmoji = style({
	position: 'absolute',
	top: '1.5rem',
	right: '1.5rem',
	fontSize: '1.25rem',
	width: '28px',
	height: '28px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: PRIMARY_LIGHT,
	borderRadius: '8px',
	color: PRIMARY_COLOR,
});

export const messageContent = style({
	fontSize: '0.925rem',
	lineHeight: '1.6',
	color: '#374151',
	fontFamily: "'Inter', sans-serif",
	marginTop: '0.5rem',
	display: '-webkit-box',
	WebkitLineClamp: 3,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	wordBreak: 'break-word',
});

export const emptyStateContainer = style({
	width: '100%',
	minHeight: '400px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#FAFAFA',
	borderRadius: '24px',
	padding: '2rem',
	margin: '2rem 0',
	border: '1px dashed #E0E0E0',
});

export const emptyStateContent = style({
	textAlign: 'center',
	padding: '2rem',
});

export const emptyStateEmoji = style({
	fontSize: '3.5rem',
	marginBottom: '1.5rem',
	display: 'inline-block',
	filter: 'saturate(1.2)',
	transform: 'rotate(-5deg)',
	animation: `${sparkleAnimation} 2s infinite`,
});

export const emptyStateTitle = style({
	fontSize: '1.5rem',
	fontWeight: '600',
	color: '#2C2C2C',
	marginBottom: '0.75rem',
	letterSpacing: '-0.02em',
});

export const emptyStateText = style({
	fontSize: '1rem',
	color: '#666666',
	lineHeight: '1.5',
	letterSpacing: '-0.01em',
});
