import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
	fontFamily: `'Clear Sans', 'Helvetica Neue', Arial, sans-serif`,
	padding: 0,
	margin: 0,
	boxSizing: 'border-box',
	background: 'purple',
});

globalStyle('a', {
	textDecoration: 'none',
	color: 'black',
});

globalStyle('list', {
	padding: '0',
	listStyle: 'none',
});

globalStyle('input', {
	border: 'none',
	outline: 'none',
});
