/**
 * SEO Configuration Constants
 * Single source of truth for SEO-related limits and settings.
 */

import { MAX_QUERY_LIMIT } from '@jung/shared/constants';

/**
 * Maximum number of items to generate static pages for.
 * Uses MAX_QUERY_LIMIT from shared constants as single source of truth.
 */
export const STATIC_GENERATION_LIMIT = MAX_QUERY_LIMIT;

/**
 * Revalidation time in seconds for ISR (Incremental Static Regeneration).
 * 3600 = 1 hour
 */
export const ISR_REVALIDATE_TIME = 3600;
