export type PostFilters = {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
};
