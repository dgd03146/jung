import { style } from '@vanilla-extract/css';

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

export const mapContainer = style({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#f9fafb',
});

export const mapPlaceholder = style({
	textAlign: 'center',
	padding: '24px',
	backgroundColor: 'white',
	borderRadius: '16px',
	boxShadow: '0 4px 24px rgba(1, 66, 192, 0.08)', // primary shadow
});

export const mapCoordinates = style({
	fontSize: '14px',
	color: '#5B86E5', // primary200
	marginBottom: '12px',
	display: 'block',
});

export const mapText = style({
	fontSize: '16px',
	color: '#002766', // primary300
	fontWeight: 600,
});

export const imageGrid = style({
	display: 'grid',
	gap: '3px',
	padding: '0',
	height: '100%',
	width: '100%',

	borderRadius: '12px',
});

export const singleImage = style({
	gridTemplate: '1fr / 1fr',
});

export const twoImages = style({
	gridTemplateAreas: `
    "main sub1"
  `,
	gridTemplateColumns: '2fr 1fr',
});

export const threeImages = style({
	gridTemplateAreas: `
    "main sub1"
    "main sub2"
  `,
	gridTemplateColumns: '2fr 1fr',
	gridTemplateRows: 'repeat(2, 1fr)',
});

export const fourImages = style({
	gridTemplateAreas: `
    "main sub1"
    "main sub2"
    "main sub3"
  `,
	gridTemplateColumns: '2fr 1fr',
	gridTemplateRows: 'repeat(3, 1fr)',
});

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
