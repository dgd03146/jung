import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const blurTransition = keyframes({
	from: { filter: 'blur(10px)' },
	to: { filter: 'blur(0)' },
});

export const image = style({
	transition: 'filter 0.3s ease-out, opacity 0.3s ease-out',
	willChange: 'filter, opacity',
	objectFit: 'cover',
	width: '100%',
	height: '100%',
});

export const blurredImage = style([
	image,
	{
		filter: 'blur(10px)',
		opacity: 0.5,
	},
]);

export const loadedImage = style([
	image,
	{
		filter: 'blur(0)',
		opacity: 1,
		animation: `${fadeIn} 0.3s ease-out, ${blurTransition} 0.3s ease-out`,
	},
]);
