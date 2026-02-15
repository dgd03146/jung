import type { SubscriberCategory } from '@/fsd/entities/subscriber';

export type SubscriberSortField =
	| 'email'
	| 'category'
	| 'is_active'
	| 'created_at';

export type SubscriberFilters = {
	page: number;
	pageSize: number;
	sortField?: SubscriberSortField;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	category?: SubscriberCategory;
	status?: 'active' | 'inactive';
};
