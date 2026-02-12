import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { bodyText, border, mutedText } from '@/fsd/shared/styles/tokens';

export const toggleSortingButton = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.15s ease',
		color: palette.primary200,
	},
});

export const th = style({
	padding: '10px 20px',
	backgroundColor: 'white',
	borderBottom: `1px solid ${border}`,
	textAlign: 'left',
	whiteSpace: 'nowrap',
	fontSize: '12px',
	fontWeight: '500',
	color: mutedText,
	textTransform: 'uppercase',
	letterSpacing: '0.04em',

	'@media': {
		'(max-width: 768px)': {
			padding: '8px 12px',
			fontSize: '11px',
		},
	},
});

export const td = style({
	padding: '12px 20px',
	borderBottom: `1px solid ${border}`,
	fontSize: '14px',
	color: bodyText,
	verticalAlign: 'middle',

	'@media': {
		'(max-width: 768px)': {
			padding: '10px 12px',
			fontSize: '13px',
		},
	},
});
