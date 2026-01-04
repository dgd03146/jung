import { style } from '@vanilla-extract/css';

export const pageContainer = style({
	padding: '0',
});

export const contentWrapper = style({
	margin: '0 auto',
	position: 'relative',
});

export const contentGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '32px',
	margin: '0 auto',
	maxWidth: '1200px',
	'@media': {
		'(max-width: 768px)': {
			gridTemplateColumns: '1fr',
		},
	},
});

const baseCard = style({
	borderRadius: '20px',
	padding: '32px',
	transition: 'all 0.3s ease',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
});

export const iconWrapper = style({
	width: '48px',
	height: '48px',
	borderRadius: '12px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '24px',
	background: 'rgba(1, 66, 192, 0.08)',
	marginBottom: '8px',
});

export const loveIcon = style({
	width: '48px',
	height: '48px',
	borderRadius: '12px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '24px',
	background: '#FFFFFF',
	marginBottom: '8px',
});

export const introCard = style([
	baseCard,
	{
		backgroundColor: 'white',
		boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
		':hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
		},
	},
]);

export const highlightCard = style([
	baseCard,
	{
		backgroundColor: '#0142C0',
		color: 'white',
		boxShadow: '0 4px 20px rgba(1, 66, 192, 0.15)',
		':hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0 8px 30px rgba(1, 66, 192, 0.2)',
		},
	},
]);

export const storyCard = style([
	baseCard,
	{
		backgroundColor: 'white',
		boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
		':hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
		},
	},
]);

export const visionCard = style([
	baseCard,
	{
		backgroundColor: '#F8FAFC',
		boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
		':hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
		},
	},
]);

export const cardTitle = style({
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.04em',
	fontSize: '1.8rem',

	color: '#0142C0',
});

export const highlightTitle = style({
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.04em',
	fontSize: '1.8rem',

	color: 'white',
});

export const ctaButton = style({
	padding: '16px 40px',
	fontSize: '1.125rem',
	fontWeight: '600',
	color: 'white',
	backgroundColor: '#0142C0',
	borderRadius: '100px',
	border: 'none',
	cursor: 'pointer',
	transition: 'all 0.3s ease',
	boxShadow: '0 8px 16px rgba(1, 66, 192, 0.15)',
	':hover': {
		backgroundColor: '#002766',
		transform: 'translateY(-2px)',
		boxShadow: '0 12px 24px rgba(1, 66, 192, 0.2)',
	},
});
