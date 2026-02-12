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

export const tableWrapper = style({
	background: 'white',
	borderRadius: '12px',
	boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
	overflow: 'hidden',
});

export const table = style({
	width: '100%',
	borderCollapse: 'collapse',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	padding: '16px',
	borderTop: '1px solid #e2e8f0',
});

export const thumbnail = style({
	width: '60px',
	height: '40px',
	objectFit: 'cover',
	borderRadius: '4px',
});

export const tipItem = style({
	padding: '2px 4px',
	borderRadius: '4px',
	background: '#f8fafc',

	':hover': {
		background: '#f1f5f9',
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
