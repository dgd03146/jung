export const PLACE_DEFAULTS = {
	LIMIT: 12,
	QUERY: '',
	SORT: 'latest',
	CAT: 'all',
} as const;

export const PLACE_CACHE = {
	STALE_TIME: 1000 * 60 * 60 * 5, // 5시간
	GC_TIME: 1000 * 60 * 60 * 24, // 24시간
} as const;
