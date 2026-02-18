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

export const BLOG_CACHE = {
	LIST: {
		STALE_TIME: 1000 * 60 * 5, // 5분
		GC_TIME: 1000 * 60 * 10, // 10분
	},
	DETAIL: {
		STALE_TIME: 1000 * 60 * 5, // 5분
		GC_TIME: 1000 * 60 * 60, // 1시간 (상세 페이지는 더 오래 캐시)
	},
	CATEGORY: {
		STALE_TIME: 1000 * 60 * 60 * 24, // 24시간
		GC_TIME: 1000 * 60 * 60 * 24 * 7, // 7일
	},
} as const;
