export type ViewMode = 'list' | 'grid' | 'table';

// export interface ViewSettings {
// 	mode: ViewMode;
// 	itemsPerPage: Record<ViewMode, number>;
// 	layoutConfig: Record<ViewMode, LayoutConfig>;
// }

// export const DEFAULT_VIEW_SETTINGS: ViewSettings = {
// 	mode: 'list',
// 	itemsPerPage: {
// 		list: 10,
// 		grid: 12,
// 		table: 20,
// 	},
// 	layoutConfig: {
// 		list: { gap: 24, columns: 1 },
// 		grid: { gap: 16, columns: 3 },
// 		table: { gap: 0, columns: 1 },
// 	},
// };

// export const isValidViewMode = (mode: string): mode is ViewMode => {
// 	return ['list', 'grid', 'table'].includes(mode as ViewMode);
// };
