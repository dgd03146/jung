import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		margin: '0 auto',
		// backgroundColor: 'white',
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
						maxHeight: '75dvh',
					},
					'(max-width: 767px)': {
						height: '100dvh',
						maxHeight: '100dvh',
						overflow: 'hidden',
					},
				},
			},
			false: {
				maxWidth: '600px',
				margin: '0 auto',

				'@media': {
					'(max-width: 767px)': {
						maxWidth: '100%',
						padding: '0 16px',
					},
				},
			},
		},
	},
});

export const aspectRatioVar = createVar();

export const imageWrapper = recipe({
	base: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		backgroundColor: 'black',
		minHeight: '200px',
		aspectRatio: aspectRatioVar,
		overflow: 'hidden',
	},
	variants: {
		isModal: {
			true: {
				'@media': {
					'(min-width: 768px)': {
						width: '65%',
						maxWidth: '100%',
						maxHeight: '75dvh',
					},
					'(max-width: 767px)': {
						height: '65dvh',
						maxHeight: '65dvh',
					},
				},
			},
			false: {
				width: '100%',
				maxHeight: '80dvh',
				margin: '20px auto 0',
				'@media': {
					'(max-width: 767px)': {
						maxHeight: '70dvh',
						margin: '16px auto 0',
					},
				},
			},
		},
	},
});

export const image = style({
	objectFit: 'contain',
});

export const content = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '24px',
		backgroundColor: 'white',
		width: '100%',
	},
	variants: {
		isModal: {
			true: {
				padding: '14px',
				'@media': {
					'(min-width: 768px)': {
						width: '35%',
						maxHeight: '75dvh',
						height: '75dvh',
						padding: '20px',
						overflowY: 'auto',
					},
					'(max-width: 767px)': {
						height: '35dvh',
						maxHeight: '35dvh',
						padding: '12px',
						gap: '16px',
						overflowY: 'auto',
					},
				},
			},
			false: {
				padding: '24px 0',
				margin: '0 auto',
				'@media': {
					'(max-width: 767px)': {
						padding: '20px 0',
					},
				},
			},
		},
	},
});

export const likesContainer = style({
	borderTopWidth: '1px',
});
