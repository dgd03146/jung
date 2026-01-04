import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const borderBottomStyle = style({
	borderBottomWidth: '1px',
});

export const gridContainer = style({
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

export const gridItem = style({
	transition: 'all 0.15s ease-in-out',
	':hover': {
		backgroundColor: palette.white100,
	},
});
