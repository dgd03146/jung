import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';

const slideUpAnimation = keyframes({
	'0%': { transform: 'translateY(100%)' },
	'100%': { transform: 'translateY(0)' },
});

export const header = style({
	backgroundColor: palette.white,
	borderBottom: `1px solid ${palette.primary50}`,
	paddingTop: '8px',
	paddingBottom: '16px',
});

export const headerContent = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
});

export const viewToggle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '8px 16px',
	border: `1px solid ${palette.primary100}`,
	borderRadius: '8px',
	backgroundColor: palette.white,
	fontSize: '13px',
	color: palette.primary200,
	fontWeight: 500,
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	selectors: {
		'&:hover': {
			color: palette.primary,
			borderColor: palette.primary,
			backgroundColor: palette.primary50,
		},
	},
});

export const main = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	margin: '16px 0',
});

export const gridView = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
	gap: '24px',
	'@media': {
		'(max-width: 768px)': {
			gap: '16px',
			gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
		},
	},
});

export const listSection = style({
	overflowY: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	padding: '8px',
	borderRadius: '12px',
	backgroundColor: palette.white,
	border: `1px solid ${palette.primary100}`,
	boxShadow: `0 2px 4px ${palette.primary50}`,

	selectors: {
		'&::-webkit-scrollbar': {
			width: '6px',
		},
		'&::-webkit-scrollbar-track': {
			background: palette.primary50,
			borderRadius: '3px',
		},
		'&::-webkit-scrollbar-thumb': {
			background: palette.primary100,
			borderRadius: '3px',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			background: palette.primary200,
		},
	},
});

export const mapView = style({
	position: 'relative',
	width: '100%',
	height: '100%',
});

export const mapSection = style({
	width: '100%',
	height: '100%',
});

export const slideUpList = style({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	height: 'calc(100dvh - 220px)', // 20px 더 작게
	backgroundColor: palette.white,
	borderRadius: '20px 20px 0 0',
	boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
	padding: '20px',
	overflowY: 'auto',
	zIndex: 2,
	animation: `${slideUpAnimation} 0.3s ease-out`,
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',

	'@media': {
		'screen and (min-width: 1920px)': {
			left: '20px',
			maxWidth: '400px',
			height: 'calc(100dvh - 260px)', // 20px 더 작게
			borderRadius: '20px',
			margin: '20px',
		},
		'screen and (min-width: 1440px) and (max-width: 1919px)': {
			left: '20px',
			maxWidth: '400px',
			height: 'calc(100dvh - 240px)', // 20px 더 작게
			borderRadius: '20px',
			margin: '20px',
		},
		'screen and (min-width: 768px) and (max-width: 1439px)': {
			left: '20px',
			maxWidth: '400px',
			height: 'calc(100dvh - 220px)', // 20px 더 작게
			borderRadius: '20px',
			margin: '20px',
		},
		'screen and (max-width: 768px)': {
			height: 'calc(100dvh - 260px)', // 20px 더 작게
		},
		'screen and (max-width: 480px)': {
			height: 'calc(100dvh - 280px)', // 20px 더 작게
		},
	},
});

export const mapPlaceholder = style({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: palette.gray100,
	color: palette.primary,
	fontSize: '18px',
	fontWeight: 500,
	borderRadius: '12px',
	padding: '20px',
	textAlign: 'center',
	position: 'relative',
	overflow: 'hidden',

	'::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		backgroundSize: '20px 20px',
		opacity: 0.3,
	},
});
