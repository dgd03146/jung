import type { Comment } from '@jung/shared/types';
import { ErrorBoundary } from '@jung/shared/ui';
import CommentError from './CommentError';

interface CommentListProps {
	comments: Comment[];
	renderItem: (comment: Comment) => React.ReactNode;
}

export const CommentList = ({ comments, renderItem }: CommentListProps) => {
	return (
		<>
			{comments.map((comment, index) => {
				const stableKey = `comment-${comment.user_id}-${index}-${
					comment.parent_id || 'root'
				}`;

				return (
					<ErrorBoundary
						key={stableKey}
						fallback={(error) => <CommentError error={error} />}
					>
						{renderItem(comment)}
					</ErrorBoundary>
				);
			})}
		</>
	);
};
