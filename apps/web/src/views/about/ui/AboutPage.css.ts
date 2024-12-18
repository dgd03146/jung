import { style } from '@vanilla-extract/css';

export const pageContainer = style({
	background: 'linear-gradient(to bottom, #FFFFFF, #F8FAFC)',
	padding: '40px 24px',
});

export const contentWrapper = style({
	margin: '0 auto',
	position: 'relative',
});

export const header = style({
	textAlign: 'center',
	marginBottom: '40px',
});

export const title = style({
	fontSize: '4rem',
	fontWeight: '800',
	background: 'linear-gradient(135deg, #0142C0 0%, #5B86E5 100%)',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	marginBottom: '16px',
	letterSpacing: '-0.02em',
});

export const subtitle = style({
	fontSize: '1.25rem',
	color: '#64748B',
	fontWeight: '400',
	letterSpacing: '0.02em',
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
	fontSize: '1.5rem',
	fontWeight: '600',
	color: '#0142C0',
	letterSpacing: '-0.02em',
});

export const highlightTitle = style({
	fontSize: '1.5rem',
	fontWeight: '600',
	color: 'white',
	letterSpacing: '-0.02em',
});

export const cardContent = style({
	fontSize: '1.125rem',
	lineHeight: '1.7',
	color: '#334155',
	fontWeight: '400',
});

export const highlightContent = style({
	fontSize: '1.125rem',
	lineHeight: '1.7',
	color: 'rgba(255, 255, 255, 0.9)',
	fontWeight: '400',
});

export const ctaContainer = style({
	display: 'flex',
	justifyContent: 'center',
	marginTop: '64px',
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
