import { style } from '@vanilla-extract/css';

export const motionWrapper = style({
	width: '100%',
	height: '100%',
	perspective: '1500px',
	cursor: 'pointer',
	transformStyle: 'preserve-3d',
	willChange: 'transform',
	userSelect: 'none',
});

export const card = style({
	width: '100%',
	height: '100%',
	position: 'relative',
	transformStyle: 'preserve-3d',
	borderRadius: '0.75rem',
	overflow: 'hidden',
	background: 'white',
	boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
	transition: 'box-shadow 0.3s ease',
	willChange: 'transform, box-shadow',

	selectors: {
		'&:hover': {
			boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
		},
	},
});

export const content = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	zIndex: 2,
});
