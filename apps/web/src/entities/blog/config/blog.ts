export const BLOG_DEFAULTS = {
	CATEGORY: 'all',
	SORT: 'latest',
	QUERY: '',
	LIMIT: 10,
} as const;

export type BlogSort = 'latest' | 'oldest' | 'popular';

export const BLOG_SORT_OPTIONS: Array<{ value: BlogSort; label: string }> = [
	{ value: 'latest', label: '최신순' },
	{ value: 'oldest', label: '오래된순' },
	{ value: 'popular', label: '인기순' },
];
