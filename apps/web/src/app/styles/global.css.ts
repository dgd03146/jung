import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
	margin: 0,
	boxSizing: 'border-box',
});

globalStyle('button', {
	cursor: 'pointer',
	background: 'none',
});

globalStyle('a', {
	outline: 'none',
	textDecoration: 'none',
	color: 'black',
});
