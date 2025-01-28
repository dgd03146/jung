import type { RouteList, RouteMap } from '../model';

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
} as const;

export const SECONDARY_NAVIGATION: RouteMap = {
	ABOUT: {
		label: 'about',
		path: '/about',
	},
	LOGIN: {
		label: 'login',
		path: '/login',
	},
} as const;

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
