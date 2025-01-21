import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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

export const showListButton = style({
	position: 'absolute',
	bottom: '40px',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '12px 24px',
	backgroundColor: '#0142C0',
	border: 'none',
	borderRadius: '24px',
	boxShadow: '0 4px 12px rgba(1, 66, 192, 0.25)',
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: '600',
	color: '#FFFFFF',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	transition: 'all 0.2s',
	zIndex: 5,

	':hover': {
		transform: 'translateX(-50%) scale(1.05)',
		backgroundColor: '#0039AD',
	},
	':active': {
		transform: 'translateX(-50%) scale(0.95)',
	},

	background: 'linear-gradient(180deg, #0142C0 0%, #0039AD 100%)',
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

export const markerContainer = style({
	position: 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
	willChange: 'transform',
	zIndex: 1,
});

export const markerTooltip = style({
	position: 'absolute',
	bottom: '100%',
	left: '50%',
	transform: 'translateX(-50%)',
	backgroundColor: 'white',
	borderRadius: '8px',
	padding: '8px 12px',
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
	whiteSpace: 'nowrap',
	pointerEvents: 'none',
	zIndex: 1,
	marginBottom: '8px',
	textAlign: 'center',
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
	transition: 'all 0.2s ease-out',
	zIndex: 1,
	transform: 'translate(-50%, -50%)',

	':hover': {
		transform: 'translate(-50%, -50%) scale(1.05)',
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

export const customMarkerBase = style({
	position: 'relative',
	color: '#FFFFFF',
	width: '34px',
	height: '34px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
	cursor: 'pointer',
	transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

	willChange: 'transform',

	'::after': {
		content: '""',
		position: 'absolute',
		bottom: '-8px',
		left: '50%',
		marginLeft: '-8px',
		borderLeft: '8px solid transparent',
		borderRight: '8px solid transparent',
	},
});

export const customMarker = recipe({
	base: customMarkerBase,

	variants: {
		category: {
			nature: {
				backgroundColor: '#22C55E',
				border: '2.5px solid #22C55E',
				'::after': {
					borderTop: '8px solid #22C55E',
				},
			},
			landmark: {
				backgroundColor: '#3B82F6',
				border: '2.5px solid #3B82F6',
				'::after': {
					borderTop: '8px solid #3B82F6',
				},
			},
			historic: {
				backgroundColor: '#9A3412',
				border: '2.5px solid #9A3412',
				'::after': {
					borderTop: '8px solid #9A3412',
				},
			},
			culture: {
				backgroundColor: '#8B5CF6',
				border: '2.5px solid #8B5CF6',
				'::after': {
					borderTop: '8px solid #8B5CF6',
				},
			},
			night: {
				backgroundColor: '#475569',
				border: '2.5px solid #475569',
				'::after': {
					borderTop: '8px solid #475569',
				},
			},
			street: {
				backgroundColor: '#F43F5E',
				border: '2.5px solid #F43F5E',
				'::after': {
					borderTop: '8px solid #F43F5E',
				},
			},
			park: {
				backgroundColor: '#10B981',
				border: '2.5px solid #10B981',
				'::after': {
					borderTop: '8px solid #10B981',
				},
			},
			local: {
				backgroundColor: '#F97316',
				border: '2.5px solid #F97316',
				'::after': {
					borderTop: '8px solid #F97316',
				},
			},
			restaurant: {
				backgroundColor: '#EF4444',
				border: '2.5px solid #EF4444',
				'::after': {
					borderTop: '8px solid #EF4444',
				},
			},
			museum: {
				backgroundColor: '#6366F1',
				border: '2.5px solid #6366F1',
				'::after': {
					borderTop: '8px solid #6366F1',
				},
			},
			shopping: {
				backgroundColor: '#EC4899',
				border: '2.5px solid #EC4899',
				'::after': {
					borderTop: '8px solid #EC4899',
				},
			},
			beach: {
				backgroundColor: '#14B8A6',
				border: '2.5px solid #14B8A6',
				'::after': {
					borderTop: '8px solid #14B8A6',
				},
			},
			sports: {
				backgroundColor: '#2563EB',
				border: '2.5px solid #2563EB',
				'::after': {
					borderTop: '8px solid #2563EB',
				},
			},
			entertainment: {
				backgroundColor: '#D946EF',
				border: '2.5px solid #D946EF',
				'::after': {
					borderTop: '8px solid #D946EF',
				},
			},
			religious: {
				backgroundColor: '#78716C',
				border: '2.5px solid #78716C',
				'::after': {
					borderTop: '8px solid #78716C',
				},
			},
			viewpoint: {
				backgroundColor: '#0EA5E9',
				border: '2.5px solid #0EA5E9',
				'::after': {
					borderTop: '8px solid #0EA5E9',
				},
			},
			hotel: {
				backgroundColor: '#6D28D9',
				border: '2.5px solid #6D28D9',
				'::after': {
					borderTop: '8px solid #6D28D9',
				},
			},
			transport: {
				backgroundColor: '#64748B',
				border: '2.5px solid #64748B',
				'::after': {
					borderTop: '8px solid #64748B',
				},
			},
		},
		selected: {
			true: {
				transform: 'scale(1.1)',
			},
			false: {
				transform: 'scale(1)',
			},
		},
	},
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
