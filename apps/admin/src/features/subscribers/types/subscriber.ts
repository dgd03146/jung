export interface Subscriber {
	id: string;
	email: string;
	category: 'frontend' | 'ai' | 'both';
	is_active: boolean;
	created_at: string;
	updated_at: string;
	unsubscribed_at: string | null;
}

export interface SubscriberFilters {
	page: number;
	pageSize: number;
	filter?: string;
	category?: 'frontend' | 'ai' | 'both';
	isActive?: boolean;
}
