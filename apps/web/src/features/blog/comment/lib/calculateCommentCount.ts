import type { Comment } from '@jung/shared/types';

export const calculateCommentCount = (comments: Comment[]) =>
	comments.reduce(
		(count, comment) => count + 1 + (comment.replies?.length || 0),
		0,
	);
