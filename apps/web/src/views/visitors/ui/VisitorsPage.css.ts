import { style } from '@vanilla-extract/css';

const PRIMARY_COLOR = '#0142C0';
const PRIMARY_LIGHT = '#E5EDFF';
const PRIMARY_GRADIENT = 'linear-gradient(135deg, #0142C0 0%, #0156F5 100%)';

export const container = style({
	// background: '#FFFFFF',
	position: 'relative',
	overflow: 'hidden',
});

export const content = style({
	position: 'relative',
	maxWidth: '1200px',
	margin: '0 auto',
	padding: '20px 0',
	zIndex: 1, // 배경 위에 컨텐츠가 보이도록
});

export const header = style({
	textAlign: 'center',
	padding: '0 0 4rem',
	position: 'relative',
	':after': {
		content: '""',
		position: 'absolute',
		bottom: '0',
		left: '50%',
		transform: 'translateX(-50%)',
		width: '60px',
		height: '3px',
		// background: PRIMARY_GRADIENT,
		borderRadius: '2px',
	},
});

export const title = style({
	fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
	fontWeight: '800',
	color: PRIMARY_COLOR,
	marginBottom: '1.5rem',
	// fontFamily: "'Playfair Display', serif",
	letterSpacing: '-0.02em',
	position: 'relative',
	display: 'inline-block',

	':after': {
		content: '""',
		position: 'absolute',
		width: '30px',
		height: '30px',
		background: PRIMARY_LIGHT,
		borderRadius: '50%',
		zIndex: -1,
		right: '-10px',
		top: '-5px',
	},
});

export const subtitle = style({
	fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
	fontWeight: '600',
	color: PRIMARY_COLOR,
	marginBottom: '1rem',
	fontFamily: "'Inter', sans-serif",
	opacity: 0.8,
});

export const description = style({
	fontSize: '1rem',
	color: '#4B5563',
	maxWidth: '600px',
	margin: '0 auto',
	lineHeight: '1.8',
	fontFamily: "'Inter', sans-serif",
});
