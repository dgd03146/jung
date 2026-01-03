// JSON-LD Schema Utilities for SEO
export { createArticleSchema } from './article';
export { createBreadcrumbSchema } from './breadcrumb';
export {
	AUTHOR,
	PUBLISHER,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
} from './constants';
export { createFAQPageSchema } from './faq';
export {
	createImageGallerySchema,
	createImageObjectSchema,
} from './imageObject';
export { createPlaceSchema } from './place';
export type {
	Article,
	BreadcrumbItem,
	BreadcrumbList,
	FAQPage,
	ImageObject,
	Organization,
	Person,
	Place,
	Question,
	SearchAction,
	WebSite,
	WithContext,
} from './types';
export { createWebSiteSchema } from './website';
