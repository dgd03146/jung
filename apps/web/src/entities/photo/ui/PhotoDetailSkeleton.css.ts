import { style } from '@vanilla-extract/css';

export const container = style({
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
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '40px',
	padding: '24px 0',
	flex: 1,
});

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	aspectRatio: '4/3',
	minBlockSize: '450px',
	backgroundColor: 'black',
	'@media': {
		'(min-width: 1024px)': {
			inlineSize: '100%',
			blockSize: 'auto',
			aspectRatio: '16/9',
		},
	},
});
