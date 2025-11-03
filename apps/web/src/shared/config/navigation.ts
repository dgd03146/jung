import type { RouteList, RouteMap } from '../model';
import { ROUTES } from './routes';

export const PRIMARY_NAVIGATION: RouteMap = {
	BLOG: ROUTES.BLOG,
	GALLERY: ROUTES.GALLERY,
	PLACES: ROUTES.PLACES,
	GUESTBOOK: ROUTES.GUESTBOOK,
	ABOUT: ROUTES.ABOUT,
} as const;

export const SECONDARY_NAVIGATION: RouteMap = {
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
