import type { Subscriber } from '@/fsd/entities/subscriber';
import type { SubscriberFilters } from '@/fsd/features/subscribers/types/subscriberFilters';
import { supabase } from '@/fsd/shared';

const ALLOWED_SORT_FIELDS = [
	'email',
	'category',
	'is_active',
	'created_at',
] as const;

type AllowedSortField = (typeof ALLOWED_SORT_FIELDS)[number];

const isAllowedSortField = (field: string): field is AllowedSortField =>
	(ALLOWED_SORT_FIELDS as readonly string[]).includes(field);

export const fetchSubscribers = async ({
	page,
	pageSize,
	sortField,
	sortOrder,
	filter,
	category,
	status,
}: SubscriberFilters): Promise<{
	subscribers: Subscriber[];
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}> => {
	const from = page * pageSize;
	const to = from + pageSize - 1;

	let query = supabase.from('subscribers').select('*', { count: 'exact' });

	if (sortField && isAllowedSortField(sortField)) {
		query = query.order(sortField, { ascending: sortOrder === 'asc' });
	} else {
		query = query.order('created_at', { ascending: false });
	}

	if (filter) {
		query = query.ilike('email', `%${filter}%`);
	}

	if (category) {
		query = query.eq('category', category);
	}

	if (status === 'active') {
		query = query.eq('is_active', true);
	} else if (status === 'inactive') {
		query = query.eq('is_active', false);
	}

	query = query.range(from, to);

	const { data, error, count } = await query;

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const hasMore = page < totalPages - 1;

	if (error) {
		throw new Error(`Failed to fetch subscribers: ${error.message}`);
	}

	if (!data || data.length === 0) {
		return { subscribers: [], totalCount, totalPages, hasMore };
	}

	const subscribers: Subscriber[] = data.map((row) => ({
		id: row.id,
		email: row.email,
		category: row.category as Subscriber['category'],
		is_active: row.is_active,
		created_at: row.created_at,
		updated_at: row.updated_at,
		unsubscribed_at: row.unsubscribed_at,
	}));

	return { subscribers, totalCount, totalPages, hasMore };
};
