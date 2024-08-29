import {
	MdArticle,
	MdDashboard,
	MdForum,
	MdPhotoLibrary,
	MdRestaurantMenu,
} from 'react-icons/md';

export const Routes = [
	{ path: '/', icon: <MdDashboard />, label: 'dashboard' },
	{ path: '/blog', icon: <MdArticle />, label: 'blog' },
	{ path: '/gallery', icon: <MdPhotoLibrary />, label: 'gallery' },
	{ path: '/spots', icon: <MdRestaurantMenu />, label: 'spots' },
	{ path: '/community', icon: <MdForum />, label: 'community' },
];
