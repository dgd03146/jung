/**
 * Reciprocal Rank Fusion (RRF) k parameter.
 * Controls how much weight is given to higher-ranked items.
 * Higher k = more equal weighting across ranks.
 * Common values: 60 (default), 20-100 range.
 * Formula: score = 1 / (k + rank)
 */
export const RRF_K = 60;

/**
 * Gemini embedding model for vector search.
 * gemini-embedding-001: 3072 dimensions (high accuracy semantic search)
 */
export const EMBEDDING_MODEL = 'gemini-embedding-001';

/**
 * Escapes special characters for PostgREST ilike/like patterns.
 * Prevents SQL injection via wildcard manipulation.
 */
export function escapePostgrestPattern(input: string): string {
	return input
		.replace(/\\/g, '\\\\') // Escape backslashes first
		.replace(/%/g, '\\%') // Escape percent signs
		.replace(/_/g, '\\_'); // Escape underscores
}
