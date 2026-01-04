export type RouteItem = {
	label: string;
	path: string;
};

export type RouteMap = {
	[key: string]: RouteItem;
};

export type RouteList = (RouteItem & { id: string })[];
