import type { RouteList, RouteMap } from '../model';
import { ROUTES } from './routes';

export const PRIMARY_NAVIGATION: RouteMap = {
	BLOG: ROUTES.BLOG,
	GALLERY: ROUTES.GALLERY,
	SPOTS: ROUTES.SPOTS,
	GUESTBOOK: ROUTES.GUESTBOOK,
} as const;

export const SECONDARY_NAVIGATION: RouteMap = {
	ABOUT: ROUTES.ABOUT,
	LOGIN: ROUTES.LOGIN,
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
