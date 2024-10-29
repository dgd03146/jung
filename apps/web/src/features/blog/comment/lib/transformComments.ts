import type { Comment } from '@jung/shared/types';

export function transformComments(comments: Comment[]): Comment[] {
	const commentMap = new Map<string, Comment>();
	const rootComments: Comment[] = [];

	for (const comment of comments) {
		commentMap.set(comment.id, { ...comment, replies: [] });
	}

	for (const comment of comments) {
		if ('parent_id' in comment && comment.parent_id !== null) {
			const parentComment = commentMap.get(comment.parent_id);
			if (parentComment && 'replies' in parentComment) {
				(parentComment.replies as Comment[]).push(
					commentMap.get(comment.id as string)!,
				);
			}
		} else {
			rootComments.push(commentMap.get(comment.id)!);
		}
	}

	return rootComments;
}
