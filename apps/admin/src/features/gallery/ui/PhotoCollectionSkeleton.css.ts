import { style } from '@vanilla-extract/css';

export const photoCollectionSkeleton = style({
	width: '240px',
	height: '240px',
});

export const transition = style({
	transition: 'all 0.15s ease-in-out',
});

export const borderTop = style({
	borderTopWidth: '1px',
});

export const collectionGrid = style({
	gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
		},
		'(min-width: 1024px)': {
			gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
		},
	},
});
