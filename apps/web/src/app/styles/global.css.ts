import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
	margin: 0,
	boxSizing: 'border-box',
	fontFamily:
		'var(--font-poppins), Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
