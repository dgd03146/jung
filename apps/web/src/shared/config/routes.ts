export const ROUTES = {
	BLOG: {
		label: 'blog',
		path: '/blog',
	},
	GALLERY: {
		label: 'gallery',
		path: '/gallery',
	},
	PHOTO: {
		label: 'photo',
		path: '/gallery/photo',
		pathById: (id?: string) => `/gallery/photo/${id || ''}`,
	},
	COLLECTION: {
		label: 'collections',
		path: '/gallery/collections',
		pathById: (id?: string) => `/gallery/collections/${id || ''}`,
	},

	PLACES: {
		label: 'places',
		path: '/places',
	},
	GUESTBOOK: {
		label: 'guestbook',
		path: '/guestbook',
	},
	ABOUT: {
		label: 'about',
		path: '/about',
	},
	LOGIN: {
		label: 'login',
		path: '/login',
	},
} as const;
