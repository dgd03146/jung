/**
 * SEO Configuration Constants
 * Single source of truth for SEO-related limits and settings.
 */

/**
 * Maximum number of items to generate static pages for.
 * Used in generateStaticParams() for blog posts, gallery photos, places, etc.
 * Also used in sitemap generation.
 */
export const STATIC_GENERATION_LIMIT = 500;

/**
 * Revalidation time in seconds for ISR (Incremental Static Regeneration).
 * 3600 = 1 hour
 */
export const ISR_REVALIDATE_TIME = 3600;
