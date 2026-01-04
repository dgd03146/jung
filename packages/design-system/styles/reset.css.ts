import { globalStyle, style } from '@vanilla-extract/css';
import type { JSX } from 'react';

globalStyle('body', {
	padding: 0,
	margin: 0,
	boxSizing: 'border-box',
});

globalStyle('a', {
	textDecoration: 'none',
	outline: 'none',
	color: 'none',
});

globalStyle('*, *::before, *::after', {
	margin: 0,
	padding: 0,
	border: 0,
	minWidth: 0,
	boxSizing: 'border-box',
	fontSize: '100%',
	font: 'inherit',
	verticalAlign: 'baseline',
});

const block = style({
	display: 'block',
});

const ul = style({
	padding: '0',
	margin: '0',
});

const list = style({
	listStyle: 'none',
});

const button = style({
	outline: 'none',
	cursor: 'pointer',
});

const quote = style({
	quotes: 'none',
	selectors: {
		'&:before, &:after': {
			content: "''",
		},
	},
});

const h1 = style({
	margin: '0',
});

const h2 = style({
	margin: '0',
});

const h3 = style({
	margin: '0',
});

const h4 = style({
	margin: '0',
});

const table = style({
	borderCollapse: 'collapse',
	borderSpacing: 0,
});

// Custom reset rules
const mark = style({
	backgroundColor: 'transparent',
	color: 'inherit',
});

const select = style({
	appearance: 'none',
	selectors: {
		'&::-ms-expand': {
			display: 'none',
		},
	},
});

const a = style({
	textDecoration: 'none',
});

type Resets = Partial<Record<keyof JSX.IntrinsicElements, string>>;

export const elementResets: Resets = {
	article: block,
	aside: block,
	button,
	a,
	details: block,
	figcaption: block,
	figure: block,
	footer: block,
	header: block,
	hgroup: block,
	menu: block,
	nav: block,
	section: block,
	textarea: block,
	li: list,
	ul,
	ol: list,
	blockquote: quote,
	q: quote,
	table,
	h1,
	h2,
	h3,
	h4,
	mark,
	select,
};
