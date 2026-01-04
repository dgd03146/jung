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

export const markerContainer = style({
	position: 'absolute',

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
