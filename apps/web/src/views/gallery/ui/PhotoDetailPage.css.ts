import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxWidth: '100%',
		margin: '0 auto',
		backgroundColor: 'white',
	},
	variants: {
		isModal: {
			true: {
				maxWidth: '935px',
				height: 'auto',
				'@media': {
					'(min-width: 768px)': {
						flexDirection: 'row',

						maxWidth: '90vw',
						maxHeight: '65dvh',
						height: '65dvh',
					},
				},
			},
		},
	},
});

export const imageWrapper = recipe({
	base: {
		position: 'relative',
		width: '100%',
		aspectRatio: '1/1',
		backgroundColor: 'black',
	},
	variants: {
		isModal: {
			true: {
				'@media': {
					'(min-width: 768px)': {
						width: '65%',
						maxHeight: '65dvh',
						height: '65dvh',
					},
				},
			},
		},
	},
});

export const content = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '24px',
		padding: '20px 0',
		backgroundColor: 'white',
	},
	variants: {
		isModal: {
			true: {
				padding: '14px',
				'@media': {
					'(min-width: 768px)': {
						width: '35%',
						maxHeight: '65dvh',
						height: '65dvh',
						padding: '20px',
					},
				},
			},
		},
	},
});

export const likesContainer = style({
	borderTopWidth: '1px',
});
