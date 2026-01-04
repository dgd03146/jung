import { globalStyle, style } from '@vanilla-extract/css';

export const mapContainer = style({
	width: '100%',
	height: '100%',
	position: 'relative',

	boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
	borderRadius: '12px',
	overflow: 'hidden',
});

export const map = style({
	minHeight: 'calc(100dvh - 200px)',
	maxHeight: 'calc(100dvh - 200px)',
	backgroundColor: '#f9fafb',

	'@media': {
		'screen and (min-width: 1920px)': {
			minHeight: 'calc(100dvh - 240px)',
			maxHeight: 'calc(100dvh - 240px)',
		},
		'screen and (min-width: 1440px) and (max-width: 1919px)': {
			minHeight: 'calc(100dvh - 220px)',
			maxHeight: 'calc(100dvh - 220px)',
		},
		'screen and (max-width: 1024px)': {
			minHeight: 'calc(100dvh - 200px)',
			maxHeight: 'calc(100dvh - 200px)',
		},
		'screen and (max-width: 768px)': {
			minHeight: 'calc(100dvh - 240px)',
			maxHeight: 'calc(100dvh - 240px)',
		},
		'screen and (max-width: 480px)': {
			minHeight: 'calc(100dvh - 260px)',
			maxHeight: 'calc(100dvh - 260px)',
		},
	},
});

export const errorContainer = style({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#f9fafb',
	borderRadius: '24px',
	padding: '24px',
});

globalStyle(`${errorContainer} p`, {
	fontSize: '14px',
	color: '#718096',
	textAlign: 'center',
	marginTop: '12px',
});

export const mapControls = style({
	position: 'absolute',
	top: '16px',
	right: '16px',
	display: 'flex',
	gap: '8px',
	zIndex: 1,
});

export const mapControl = style({
	width: '32px',
	height: '32px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#F8FAFC',
	borderRadius: '10px',
	border: 'none',
	color: '#0142C0',
	transition: 'all 0.2s ease',
	cursor: 'pointer',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.08)',
		color: '#0142C0',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 12px rgba(1, 66, 192, 0.08)',
	},

	':active': {
		transform: 'translateY(0)',
		backgroundColor: 'rgba(1, 66, 192, 0.12)',
		boxShadow: '0 2px 4px rgba(1, 66, 192, 0.06)',
	},
});

export const locationInfo = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	marginTop: '8px',
	color: '#718096',
	fontSize: '13px',
});

export const locationIcon = style({
	color: '#5B86E5',
	flexShrink: 0,
});

export const coordinates = style({
	fontSize: '12px',
	color: '#5B86E5',
	backgroundColor: 'rgba(1, 66, 192, 0.08)',
	padding: '4px 8px',
	borderRadius: '6px',
	marginTop: '4px',
});

export const customMarkerLabel = style({
	transform: 'scale(1)',
	transition: 'all 0.2s ease-out',
	zIndex: 1,

	':hover': {
		transform: 'scale(1.1)',
		boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
		zIndex: 2,
	},

	selectors: {
		'&.active': {
			transform: 'scale(1.1)',
			boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
			zIndex: 2,
		},
	},
});

export const markerCluster = style({
	backgroundColor: '#1E40AF',
	color: '#FFFFFF',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: '3px solid rgba(255, 255, 255, 1)',
	boxShadow: '0 4px 12px rgba(30, 64, 175, 0.35)',

	lineHeight: '0',
	padding: 0,
	margin: 0,

	zIndex: 1,

	':hover': {
		boxShadow: '0 8px 16px rgba(30, 64, 175, 0.4)',
		zIndex: 2,
	},
});

globalStyle(`${markerCluster} > div`, {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	paddingRight: '4px',
	textAlign: 'center',
	width: '100%',
	height: '100%',
});

export const markerClusterMedium = style({
	backgroundColor: '#1E3A8A',
});

export const markerClusterLarge = style({
	backgroundColor: '#172554',
});

globalStyle('.gm-style-iw.gm-style-iw-c', {
	padding: '0 !important',
	maxWidth: '280px !important',

	'@media': {
		'(min-width: 768px)': {
			maxWidth: '300px !important',
		},
	},
});

globalStyle('.gm-style-iw-d', {
	overflow: 'hidden !important',
	maxHeight: 'none !important',
});

globalStyle('.gm-style-iw', {
	padding: '0 !important',
	maxHeight: 'none !important',
});

globalStyle('.gm-style-iw-tc', {
	filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
});

globalStyle('.gm-ui-hover-effect', {
	display: 'none !important',
});

globalStyle('.gm-style-iw-ch', {
	display: 'none !important',
});
