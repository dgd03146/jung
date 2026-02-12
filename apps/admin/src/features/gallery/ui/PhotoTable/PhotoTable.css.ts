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
import { border } from '@/fsd/shared/styles/tokens';

export const container = style({
	backgroundColor: 'white',
	borderRadius: '8px',
	border: `1px solid ${border}`,
	overflow: 'hidden',
	width: '100%',
});
