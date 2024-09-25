import {
	MdArticle,
	MdDashboard,
	MdForum,
	MdPhotoLibrary,
	MdRestaurantMenu,
} from 'react-icons/md';

// FIXME: 굳이 필요한가?..

export const Routes = {
	home: { path: '/', icon: <MdDashboard />, label: 'dashboard' },
	blog: { path: '/blog', icon: <MdArticle />, label: 'blog' },

	gallery: { path: '/gallery', icon: <MdPhotoLibrary />, label: 'gallery' },
	spots: { path: '/spots', icon: <MdRestaurantMenu />, label: 'spots' },
	community: { path: '/community', icon: <MdForum />, label: 'community' },
};

export const RoutesArray = Object.entries(Routes).map(([key, value]) => ({
	key,
	...value,
}));
