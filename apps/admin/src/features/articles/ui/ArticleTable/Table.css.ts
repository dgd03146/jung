import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const tableAction = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '24px',
	borderBottom: '1px solid #F1F5F9',
	backgroundColor: '#F8FAFC',
	flexWrap: 'wrap',
	gap: '16px',
});

export const th = style({
	padding: '16px 24px',
	backgroundColor: 'white',
	borderBottom: '1px solid #F1F5F9',
	textAlign: 'left',
	whiteSpace: 'nowrap',
	fontSize: '13px',
	fontWeight: '600',
	color: '#64748B',
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
	borderBottom: '1px solid #F1F5F9',
	fontSize: '14px',
	color: '#334155',
	transition: 'all 0.2s ease',
	verticalAlign: 'middle',
	maxWidth: '300px',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',

	'@media': {
		'(max-width: 768px)': {
			padding: '12px 16px',
			fontSize: '13px',
		},
	},
});

export const row = style({
	transition: 'all 0.2s ease',
	backgroundColor: 'white',

	':hover': {
		backgroundColor: '#F8FAFC',
	},
});

export const toggleSortingButton = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary200,
	},
});

export const paginationButton = style({
	border: 'none',
});

export const categoryBadge = style({
	padding: '4px 8px',
	borderRadius: '4px',
	fontSize: '12px',
	fontWeight: '500',
	textTransform: 'uppercase',
});

export const frontendBadge = style([
	categoryBadge,
	{
		backgroundColor: '#EEF2FF',
		color: '#6366F1',
	},
]);

export const aiBadge = style([
	categoryBadge,
	{
		backgroundColor: '#F3E8FF',
		color: '#9333EA',
	},
]);
