import { style } from '@vanilla-extract/css';

const PRIMARY_COLOR = '#0142C0';
const PRIMARY_LIGHT = '#E5EDFF';

export const messageWallContainer = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
	gap: '1.25rem',
	padding: '1rem 0',
	maxWidth: '1200px',
	margin: '0 auto',
});

export const messageCard = style({
	borderRadius: '16px',
	padding: '1.5rem',
	backgroundColor: '#FFFFFF',
	boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
	transition: 'all 0.2s ease',
	border: '1px solid #F0F0F0',
	position: 'relative',
	height: '100%',

	':hover': {
		boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
		borderColor: PRIMARY_LIGHT,
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
