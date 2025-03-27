import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const photoContainer = style({
	width: '240px',
	height: '240px',
});

export const photoImage = style({
	objectFit: 'cover',
});

export const checkbox = recipe({
	base: {
		opacity: 0,
		bottom: 0,
		left: 0,
	},
	variants: {
		opacity: {
			true: {
				opacity: 1,
			},
		},
	},
});
