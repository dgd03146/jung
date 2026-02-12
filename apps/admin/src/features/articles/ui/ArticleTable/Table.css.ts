export {
	categoryBadge,
	row,
	tableAction,
	td,
	th,
	toggleSortingButton,
} from '@/fsd/shared/ui/Table/Table.css';

import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

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

export const paginationButton = style({
	border: 'none',
});

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
