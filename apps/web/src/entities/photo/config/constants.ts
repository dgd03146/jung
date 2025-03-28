export const ALBUM_OPTIONS = {
	SPACING: 24,
	COLUMNS: {
		MOBILE: 2,
		LAPTOP: 3,
		DESKTOP: 4,
	},
	BREAKPOINTS: {
		MOBILE: 768,
		LAPTOP: 1024,
		DESKTOP: 1280,
	},
} as const;

export const TRENDING_PHOTO_PARAMS = {
	LIMIT: 8,
	QUERY: '',
	SORT: 'popular',
} as const;

export const PHOTO_PARAMS = {
	LIMIT: 8,
	QUERY: '',
	SORT: 'latest',
} as const;

export const PRIORITY_IMAGE = {
	MOBILE: 2,
	LAPTOP: 4,
	DESKTOP: 6,
} as const;

export const COLLECTION_PARAMS = {
	sort: 'latest',
} as const;
