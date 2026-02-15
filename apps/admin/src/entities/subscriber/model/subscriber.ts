export type SubscriberCategory = 'frontend' | 'ai' | 'both';

export interface Subscriber {
	id: string;
	email: string;
	category: SubscriberCategory;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	unsubscribed_at: string | null;
}
