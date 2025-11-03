/**
 * Common query options for like-related queries
 * Used across post, photo, and place entities
 */
export const LIKE_QUERY_OPTIONS = {
	staleTime: 10 * 1000, // 10 seconds
	refetchOnMount: true,
	refetchOnWindowFocus: 'always' as const,
	refetchOnReconnect: true,
} as const;
