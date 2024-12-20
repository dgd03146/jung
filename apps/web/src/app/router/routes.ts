type RouteItem = {
	label: string;
	path: string;
};

type RouteMap = {
	[key: string]: RouteItem;
};

type RouteList = (RouteItem & { id: string })[];

export const PRIMARY_NAVIGATION: RouteMap = {
	BLOG: {
		label: 'blog',
		path: '/blog',
	},
	GALLERY: {
		label: 'gallery',
		path: '/gallery',
	},
	FOOD: {
		label: 'spots',
		path: '/spots',
	},

	GUESTBOOK: {
		label: 'guestbook',
		path: '/guestbook',
	},
};

export const SECONDARY_NAVIGATION: RouteMap = {
	ABOUT: {
		label: 'about',
		path: '/about',
	},

	LOGIN: {
		label: 'login',
		path: '/login',
	},

	// TAGS: {
	// 	label: 'tags.',
	// 	path: '/tags',
	// },
	// QUIZ: {
	// 	label: 'quiz.',
	// 	path: '/quiz',
	// },
};

export const PRIMARY_NAV_LIST: RouteList = Object.entries(
	PRIMARY_NAVIGATION,
).map(([id, item]) => ({
	id,
	...item,
}));

export const SECONDARY_NAV_LIST: RouteList = Object.entries(
	SECONDARY_NAVIGATION,
).map(([id, item]) => ({
	id,
	...item,
}));
