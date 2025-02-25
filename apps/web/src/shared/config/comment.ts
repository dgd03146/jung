export const COMMENTS_LIMIT = 10;
export const COMMENTS_DEFAULT_ORDER = 'desc' as const;

/**
 * 댓글 쿼리에 사용되는 표준 쿼리키
 * 낙관적 업데이트 시 사용용
 */
export const getCommentsQueryKey = (postId: string) => ({
	postId,
	order: COMMENTS_DEFAULT_ORDER,
	limit: COMMENTS_LIMIT,
});
