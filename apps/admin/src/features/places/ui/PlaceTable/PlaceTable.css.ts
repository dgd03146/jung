export {
	actionButton,
	categoryBadge,
	newButton,
	pageButton,
	pagination,
	row,
	searchInput,
	tableAction,
	td,
	th,
	toggleSortingButton,
} from '@/fsd/shared/ui/Table/Table.css';

import { style } from '@vanilla-extract/css';

const border = 'rgba(0, 0, 0, 0.06)';
const hoverBg = 'rgba(0, 0, 0, 0.02)';

export const tableWrapper = style({
	background: 'white',
	borderRadius: '8px',
	border: `1px solid ${border}`,
	overflow: 'hidden',
});

export const table = style({
	width: '100%',
	borderCollapse: 'collapse',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	padding: '12px',
	borderTop: `1px solid ${border}`,
});

export const thumbnail = style({
	width: '56px',
	height: '38px',
	objectFit: 'cover',
	borderRadius: '4px',
});

export const tipItem = style({
	padding: '2px 4px',
	borderRadius: '4px',

	':hover': {
		background: hoverBg,
	},
});

export const tipText = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	maxWidth: '200px',
});

export const textAlignLeft = style({
	textAlign: 'left',
});

export const textAlignRight = style({
	textAlign: 'right',
});
