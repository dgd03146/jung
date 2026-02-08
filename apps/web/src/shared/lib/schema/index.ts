// JSON-LD Schema Utilities for SEO & GEO (Generative Engine Optimization)
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
export { createHowToSchema, extractStepsFromHeadings } from './howto';
export {
	createImageGallerySchema,
	createImageObjectSchema,
} from './imageObject';
export { createOrganizationSchema } from './organization';
export { createPlaceSchema } from './place';
export {
	createSpeakableSpecification,
	withSpeakable,
} from './speakable';
export type {
	Article,
	ArticleWithSpeakable,
	BreadcrumbItem,
	BreadcrumbList,
	FAQPage,
	HowTo,
	HowToStep,
	ImageObject,
	Organization,
	OrganizationWithGeo,
	Person,
	Place,
	PostalAddress,
	Question,
	SearchAction,
	SpeakableSpecification,
	WebSite,
	WithContext,
} from './types';
export { createWebSiteSchema } from './website';
