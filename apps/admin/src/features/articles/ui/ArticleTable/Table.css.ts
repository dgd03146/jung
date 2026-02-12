import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import {
	bodyText,
	border,
	hoverBg,
	mutedText,
} from '@/fsd/shared/styles/tokens';

export const tableAction = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '20px',
	paddingBottom: '16px',
	borderBottom: `1px solid ${border}`,
	flexWrap: 'wrap',
	gap: '12px',
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
	maxWidth: '300px',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',

	'@media': {
		'(max-width: 768px)': {
			padding: '10px 12px',
			fontSize: '13px',
		},
	},
});

export const row = style({
	transition: 'background 0.1s ease',
	backgroundColor: 'white',

	':hover': {
		backgroundColor: hoverBg,
	},
});

export const toggleSortingButton = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.15s ease',
		color: palette.primary200,
	},
});

export const paginationButton = style({
	border: 'none',
});

export const categoryBadge = style({
	padding: '2px 8px',
	borderRadius: '4px',
	fontSize: '12px',
	fontWeight: '500',
	textTransform: 'uppercase',
});

export const frontendBadge = style([
	categoryBadge,
	{
		backgroundColor: 'rgba(1, 66, 192, 0.06)',
		color: palette.primary,
	},
]);

export const aiBadge = style([
	categoryBadge,
	{
		backgroundColor: 'rgba(147, 51, 234, 0.06)',
		color: '#9333EA',
	},
]);

export const statusBadge = style({
	padding: '2px 8px',
	borderRadius: '4px',
	fontSize: '12px',
	fontWeight: '500',
});

export const publishedBadge = style([
	statusBadge,
	{
		backgroundColor: 'rgba(34, 197, 94, 0.08)',
		color: '#16a34a',
	},
]);

export const draftBadge = style([
	statusBadge,
	{
		backgroundColor: 'rgba(234, 179, 8, 0.08)',
		color: '#ca8a04',
	},
]);
