import { style } from '@vanilla-extract/css';
import { bodyText, border, mutedText } from '@/fsd/shared/styles/tokens';

export const th = style({
	padding: '16px 24px',
	backgroundColor: 'white',
	borderBottom: `1px solid ${border}`,
	textAlign: 'left',
	whiteSpace: 'nowrap',
	fontSize: '13px',
	fontWeight: '600',
	color: mutedText,
	transition: 'all 0.2s ease',

	'@media': {
		'(max-width: 768px)': {
			padding: '12px 16px',
			fontSize: '12px',
		},
	},
});

export const td = style({
	padding: '16px 24px',
	borderBottom: `1px solid ${border}`,
	fontSize: '14px',
	color: bodyText,
	transition: 'all 0.2s ease',
	verticalAlign: 'middle',

	'@media': {
		'(max-width: 768px)': {
			padding: '12px 16px',
			fontSize: '13px',
		},
	},
});
