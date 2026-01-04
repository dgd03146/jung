import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const imageSection = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '16/9',
	minHeight: '320px',
	maxHeight: '50vh',
	backgroundColor: '#f9fafb',
	overflow: 'hidden',
	borderRadius: '12px',

	'@media': {
		'screen and (max-width: 768px)': {
			aspectRatio: '4/3',
			minHeight: '280px',
		},
	},
});

export const locationIcon = style({
	color: '#5B86E5', // primary200
	flexShrink: 0,
});

export const tipItem = style({
	backgroundColor: '#f8fafc',
	padding: '16px',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#002349',
	border: '1px solid rgba(1, 66, 192, 0.12)',
	transition: 'all 0.2s ease',
	lineHeight: '1.6',

	selectors: {
		'&:hover': {
			backgroundColor: '#ffffff',
			border: '1px solid rgba(1, 66, 192, 0.2)',
			boxShadow: '0 2px 8px rgba(1, 66, 192, 0.08)',
			transform: 'translateY(-1px)',
		},
	},
});

export const imageGrid = style({
	display: 'grid',
	gap: '3px',
	padding: '0',
	height: '100%',
	width: '100%',
	borderRadius: '12px',
});

export const gridVariants = recipe({
	variants: {
		count: {
			single: {
				gridTemplate: '1fr / 1fr',
			},
			two: {
				gridTemplateAreas: `"main sub1"`,
				gridTemplateColumns: '2fr 1fr',
			},
			three: {
				gridTemplateAreas: `
					"main sub1"
					"main sub2"
				`,
				gridTemplateColumns: '2fr 1fr',
				gridTemplateRows: 'repeat(2, 1fr)',
			},
			four: {
				gridTemplateAreas: `
					"main sub1"
					"main sub2"
					"main sub3"
				`,
				gridTemplateColumns: '2fr 1fr',
				gridTemplateRows: 'repeat(3, 1fr)',
			},
		},
	},
	defaultVariants: {
		count: 'four',
	},
});

// recipe의 variants 타입 추출
export type GridVariant = NonNullable<
	Parameters<typeof gridVariants>[0]
>['count'];

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	overflow: 'hidden',
});

export const mainImage = style({
	gridArea: 'main',
	height: '100%',
});

export const gridImage = style({
	objectFit: 'cover',
	transition: 'transform 0.3s ease',
	height: '100%',

	':hover': {
		transform: 'scale(1.05)',
	},
});

export const lastImageOverlay = style({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'white',
	fontSize: '20px',
	fontWeight: '600',
	cursor: 'pointer',
});

export const placeInfoContainer = style({
	borderBottomWidth: '1px',
});
