import { supabase } from '@/fsd/shared';

export interface SubscriberStats {
	total: number;
	active: number;
	inactive: number;
	newThisMonth: number;
	churnRate: number;
	categoryDistribution: {
		frontend: number;
		ai: number;
		both: number;
	};
	monthlyGrowth: {
		month: string;
		newSubscribers: number;
		unsubscribed: number;
	}[];
}

export const fetchSubscriberStats = async (): Promise<SubscriberStats> => {
	const { data, error } = await supabase
		.from('subscribers')
		.select('category, is_active, created_at, unsubscribed_at');

	if (error) {
		throw new Error(`Failed to fetch subscriber stats: ${error.message}`);
	}

	const rows = data ?? [];
	const total = rows.length;
	const active = rows.filter((r) => r.is_active).length;
	const inactive = total - active;

	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const newThisMonth = rows.filter(
		(r) => new Date(r.created_at) >= startOfMonth,
	).length;

	const churnRate = total > 0 ? (inactive / total) * 100 : 0;

	const categoryDistribution = { frontend: 0, ai: 0, both: 0 };
	for (const row of rows) {
		const cat = row.category as keyof typeof categoryDistribution;
		if (cat in categoryDistribution) {
			categoryDistribution[cat]++;
		}
	}

	const monthlyMap = new Map<
		string,
		{ newSubscribers: number; unsubscribed: number }
	>();

	for (let i = 11; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
		monthlyMap.set(key, { newSubscribers: 0, unsubscribed: 0 });
	}

	for (const row of rows) {
		const createdDate = new Date(row.created_at);
		const createdKey = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, '0')}`;
		if (monthlyMap.has(createdKey)) {
			const entry = monthlyMap.get(createdKey)!;
			entry.newSubscribers++;
		}

		if (row.unsubscribed_at) {
			const unsubDate = new Date(row.unsubscribed_at);
			const unsubKey = `${unsubDate.getFullYear()}-${String(unsubDate.getMonth() + 1).padStart(2, '0')}`;
			if (monthlyMap.has(unsubKey)) {
				const entry = monthlyMap.get(unsubKey)!;
				entry.unsubscribed++;
			}
		}
	}

	const monthlyGrowth = Array.from(monthlyMap.entries()).map(
		([month, data]) => ({
			month,
			...data,
		}),
	);

	return {
		total,
		active,
		inactive,
		newThisMonth,
		churnRate,
		categoryDistribution,
		monthlyGrowth,
	};
};
