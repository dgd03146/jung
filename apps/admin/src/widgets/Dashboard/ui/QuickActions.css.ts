import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { gridContainer } from './DashboardStats.css';

export const borderBottom = style({
	borderBottomWidth: '1px',
});

export const gridActionsContainer = style([gridContainer, {}]);

export const actionItem = style({
	':hover': {
		backgroundColor: palette.primary50,
	},
});
