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
		label: 'blog.',
		path: '/blog',
	},
	GALLERY: {
		label: 'gallery.',
		path: '/gallery',
	},
	FOOD: {
		label: 'spots.',
		path: '/spots',
	},
	ABOUT: {
		label: 'about.',
		path: '/about',
	},
	VISITORS: {
		label: 'visitors.',
		path: '/visitors',
	},
};

export const SECONDARY_NAVIGATION: RouteMap = {
	TAGS: {
		label: 'tags.',
		path: '/tags',
	},

	QUIZ: {
		label: 'quiz.',
		path: '/quiz',
	},
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
