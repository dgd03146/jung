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
import {
	primaryTint,
	purpleText,
	purpleTint,
	successText,
	successTint,
	warningText,
	warningTint,
} from '@/fsd/shared/styles/tokens';

export const frontendBadge = style([
	categoryBadge,
	{
		backgroundColor: primaryTint,
		color: palette.primary,
	},
]);

export const aiBadge = style([
	categoryBadge,
	{
		backgroundColor: purpleTint,
		color: purpleText,
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
		backgroundColor: successTint,
		color: successText,
	},
]);

export const draftBadge = style([
	statusBadge,
	{
		backgroundColor: warningTint,
		color: warningText,
	},
]);
