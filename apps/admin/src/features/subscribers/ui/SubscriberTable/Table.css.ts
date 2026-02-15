import { style, styleVariants } from '@vanilla-extract/css';

export {
	row,
	tableAction,
	td,
	th,
	toggleSortingButton,
} from '@/fsd/shared/ui/Table/Table.css';

const badgeBase = style({
	fontWeight: 500,
});

export const categoryBadge = styleVariants({
	frontend: [badgeBase, { color: '#3B82F6' }],
	ai: [badgeBase, { color: '#8B5CF6' }],
	both: [badgeBase, { color: '#10B981' }],
	default: [badgeBase, { color: '#6B7280' }],
});

export const statusBadge = styleVariants({
	active: [badgeBase, { color: '#10B981' }],
	inactive: [badgeBase, { color: '#EF4444' }],
});
