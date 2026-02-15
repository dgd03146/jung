import { globalStyle, style } from '@vanilla-extract/css';
import {
	border,
	darkText,
	hoverBg,
	mutedText,
} from '@/fsd/shared/styles/tokens';

export const table = style({
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: '14px',
});

globalStyle(`${table} th, ${table} td`, {
	padding: '12px 16px',
	textAlign: 'left',
	borderBottom: `1px solid ${border}`,
});

globalStyle(`${table} th`, {
	fontWeight: '500',
	color: mutedText,
	background: hoverBg,
});

globalStyle(`${table} td`, {
	color: darkText,
});

export const chart = style({
	width: '100%',
	height: '400px',
	marginTop: '20px',
});

export const borderBottomStyle = style({
	borderBottomWidth: '1px',
});

export const gridContainer = style({
	display: 'grid',
	gridTemplateColumns: 'minmax(0px, 1fr)',
	'@media': {
		'(min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
		'(min-width: 1024px)': {
			gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
		},
	},
});
