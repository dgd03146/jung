import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
	base: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxInlineSize: '1024px',
		backgroundColor: 'white',
		blockSize: 'auto',
		minBlockSize: '600px',
		margin: '0 auto',
		marginBlock: '2rem',
	},
	variants: {
		isModal: {
			true: {
				overflow: 'hidden',
				margin: '0 auto',
				maxWidth: '1200px',
				width: '100%',
				'@media': {
					'(min-width: 768px)': {
						flexDirection: 'row',
						blockSize: '600px',
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
		aspectRatio: '4/3',
		minBlockSize: '450px',
		backgroundColor: 'black',
		'@media': {
			'(min-width: 768px)': {
				inlineSize: '100%',
				blockSize: 'auto',
				aspectRatio: '16/9',
			},
		},
	},
	variants: {
		isModal: {
			true: {
				'@media': {
					'(min-width: 768px)': {
						inlineSize: '60%',
						blockSize: '100%',
						aspectRatio: 'auto',
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
		gap: '40px',
		padding: '24px 0',
		flex: 1,
	},
	variants: {
		isModal: {
			true: {
				padding: '24px',
			},
		},
	},
});
