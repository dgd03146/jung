import { style } from '@vanilla-extract/css';

export const container = style({
	backgroundColor: '#ffffff',

	margin: '0 auto',
	boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
	borderRadius: '24px',
	overflow: 'hidden',
});

export const imageSection = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '16/9',
	minHeight: '320px',
	maxHeight: '50vh',
	backgroundColor: '#f9fafb',
	overflow: 'hidden',
	borderRadius: '0 0 24px 24px',

	'@media': {
		'screen and (max-width: 768px)': {
			aspectRatio: '4/3',
			minHeight: '280px',
		},
	},
});

export const titleRow = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: '16px',
	marginBottom: '20px',
});

export const title = style({
	fontSize: '28px',
	fontWeight: 700,
	color: '#1a1a1a',
	letterSpacing: '-0.02em',
	lineHeight: 1.3,
});

export const iconButton = style({
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

export const likesCount = style({
	fontSize: '14px',
	color: '#0142C0',
	fontWeight: 500,
});

export const headerButtons = style({
	display: 'flex',
	gap: '8px',
	alignSelf: 'flex-start',
});
export const rightButtons = style({
	display: 'flex',
	gap: '12px',
});

export const content = style({
	padding: '28px 24px 40px',
	maxWidth: '768px',
	margin: '0 auto',
});

export const contentHeader = style({
	marginBottom: '36px',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
});

export const meta = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	marginBottom: '16px',
});

export const ratingRow = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingBottom: '12px',
	borderBottom: '1px solid #f0f2f5',
});

export const date = style({
	fontSize: '13px',
	color: '#0142C0',
	fontWeight: 500,
	backgroundColor: 'rgba(1, 66, 192, 0.08)',
	padding: '6px 12px',
	borderRadius: '8px',
});

export const locationIcon = style({
	color: '#5B86E5', // primary200
	flexShrink: 0,
});

export const location = style({
	fontSize: '14px',
});

export const tags = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '8px',
});

export const tag = style({
	padding: '6px 14px',
	backgroundColor: 'rgba(1, 66, 192, 0.04)',
	color: '#0142C0', // primary
	borderRadius: '8px',
	fontSize: '13px',
	fontWeight: 500,
	border: '1px solid rgba(1, 66, 192, 0.12)',
	transition: 'all 0.2s ease',
	display: 'inline-flex',
	alignItems: 'center',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.08)',
		color: '#0142C0',
		transform: 'translateY(-1px)',
		// borderColor: '#0142C0',
		boxShadow: '0 2px 8px rgba(1, 66, 192, 0.08)',
	},

	':active': {
		transform: 'translateY(0)',
		backgroundColor: 'rgba(1, 66, 192, 0.12)',
		boxShadow: '0 1px 4px rgba(1, 66, 192, 0.06)',
	},
});

export const body = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '32px',
});

export const description = style({
	fontSize: '16px',
	lineHeight: 1.7,
	color: '#2d3748',
	letterSpacing: '-0.01em',
});

export const tipsList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	listStyle: 'none',
	padding: 0,
});

export const tips = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
});

export const tipsTitle = style({
	fontSize: '18px',
	fontWeight: 600,
	color: '#002766', // primary300
	marginBottom: '16px',
	letterSpacing: '-0.02em',
});

export const tipItem = style({
	backgroundColor: '#F8FAFC',
	padding: '16px 20px',
	borderRadius: '12px',
	fontSize: '14px',
	color: '#002349', // primary400
	border: 'none',
	transition: 'all 0.2s ease',
	lineHeight: '1.6',
	boxShadow: '0 2px 4px rgba(1, 66, 192, 0.08)',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.04)',
		transform: 'translateX(4px)',
		boxShadow: '0 6px 16px rgba(1, 66, 192, 0.12)',
	},

	':active': {
		backgroundColor: 'rgba(1, 66, 192, 0.06)',
		transform: 'translateX(2px)',
		boxShadow: '0 3px 8px rgba(1, 66, 192, 0.1)',
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

// 마지막 이미지에 더보기 오버레이를 위한 스타일
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
