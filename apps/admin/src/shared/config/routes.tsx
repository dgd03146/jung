import {
	MdArticle,
	MdDashboard,
	MdForum,
	MdLogin,
	MdNewspaper,
	MdPhotoLibrary,
	MdRestaurantMenu,
} from 'react-icons/md';

// FIXME: 굳이 필요한가?..

export const Routes = {
	home: { path: '/', icon: <MdDashboard />, label: 'dashboard' },
	articles: { path: '/articles', icon: <MdNewspaper />, label: 'articles' },
	blog: { path: '/blog', icon: <MdArticle />, label: 'blog' },

	gallery: { path: '/gallery', icon: <MdPhotoLibrary />, label: 'gallery' },
	places: { path: '/places', icon: <MdRestaurantMenu />, label: 'places' },
	community: { path: '/community', icon: <MdForum />, label: 'community' },
	login: { path: '/login', icon: <MdLogin />, label: 'login' },
};

export const RoutesArray = Object.entries(Routes).map(([key, value]) => ({
	key,
	...value,
}));
