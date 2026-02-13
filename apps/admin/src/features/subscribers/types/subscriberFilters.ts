export type SubscriberFilters = {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	category?: string;
	status?: string;
};
