import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';

const slideUpAnimation = keyframes({
	'0%': { transform: 'translateY(100%)' },
	'100%': { transform: 'translateY(0)' },
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
	height: 'calc(100dvh - 220px)',
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
			height: 'calc(100dvh - 260px)',
			borderRadius: '20px',
			margin: '20px',
		},
		'screen and (min-width: 1440px) and (max-width: 1919px)': {
			left: '20px',
			maxWidth: '400px',
			height: 'calc(100dvh - 240px)',
			borderRadius: '20px',
			margin: '20px',
		},
		'screen and (min-width: 768px) and (max-width: 1439px)': {
			left: '20px',
			maxWidth: '400px',
			height: 'calc(100dvh - 220px)',
			borderRadius: '20px',
			margin: '20px',
		},
		'screen and (max-width: 768px)': {
			height: 'calc(100dvh - 260px)',
		},
		'screen and (max-width: 480px)': {
			height: 'calc(100dvh - 280px)',
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
