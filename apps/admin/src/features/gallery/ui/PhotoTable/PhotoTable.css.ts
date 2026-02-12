export {
	actionButton,
	newButton,
	row,
	searchInput,
	tableAction,
	td,
	th,
} from '@/fsd/shared/ui/Table/Table.css';

import { style } from '@vanilla-extract/css';

export const container = style({
	backgroundColor: 'white',
	borderRadius: '12px',
	boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
	border: '1px solid #F1F5F9',
	overflow: 'hidden',
	width: '100%',
});
