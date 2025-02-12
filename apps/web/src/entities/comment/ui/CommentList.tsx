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
			{comments.map((comment) => (
				<ErrorBoundary
					key={comment.id}
					fallback={(error) => <CommentError error={error} />}
				>
					{renderItem(comment)}
				</ErrorBoundary>
			))}
		</>
	);
};
