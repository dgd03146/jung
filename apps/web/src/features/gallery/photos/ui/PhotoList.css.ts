import { style } from '@vanilla-extract/css';
import { keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

export const imageContainer = style({
	overflow: 'hidden',
	borderRadius: '8px',
	cursor: 'pointer',
	transition: 'transform 0.3s ease-in-out',

	':hover': {
		transform: 'scale(1.02)',
	},
});

export const image = style({
	transition: 'transform 0.3s ease-in-out',

	selectors: {
		[`${imageContainer}:hover &`]: {
			transform: 'scale(1.1)',
		},
	},
});

export const overlay = style({
	background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
	opacity: 0,
	transition: 'opacity 0.3s ease-in-out',

	selectors: {
		[`${imageContainer}:hover &`]: {
			opacity: 1,
			animation: `${fadeIn} 0.3s ease-in-out`,
		},
	},
});

export const title = style({
	transform: 'translateY(20px)',
	transition: 'transform 0.3s ease-in-out',
	textShadow: '0 2px 4px rgba(0,0,0,0.2)',

	selectors: {
		[`${imageContainer}:hover &`]: {
			transform: 'translateY(0)',
		},
	},
});
