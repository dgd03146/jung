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
import { categoryBadge } from '@/fsd/shared/ui/Table/Table.css';

export const frontendBadge = style([
	categoryBadge,
	{
		backgroundColor: palette.primary50,
		color: palette.primary,
	},
]);

export const aiBadge = style([
	categoryBadge,
	{
		backgroundColor: '#F3E8FF',
		color: '#9333EA',
	},
]);

export const paginationButton = style({
	border: 'none',
});
