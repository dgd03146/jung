import { useSupabaseAuth } from '@/fsd/shared/lib';
import LoadingSpinner from '@/fsd/shared/ui/LoadingSpinner';
import { Box, Container } from '@jung/design-system/components';
import { ErrorBoundary } from '@jung/shared/ui';
import React from 'react';
import { useGetCommentsQuery } from '../api/useGetComments';
import { calculateCommentCount } from '../lib';
import { useInfiniteScroll } from '../model/useInfiniteScroll';
import CommentError from './CommentError';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentStats from './CommentStats';

interface Props {
	postId: string;
	postLikeCount: number;
}

const Comments = ({ postId, postLikeCount }: Props) => {
	const [data, query] = useGetCommentsQuery(postId);
	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;
	const { user } = useSupabaseAuth();

	const commentCount =
		data?.pages.reduce(
			(acc, page) => acc + calculateCommentCount(page.items),
			0,
		) || 0;
	const infiniteScrollRef = useInfiniteScroll(hasNextPage, fetchNextPage);

	return (
		<Container>
			<CommentStats commentCount={commentCount} likeCount={postLikeCount} />
			<CommentForm postId={postId} />
			{data?.pages.map((page, pageIndex) => (
				<React.Fragment key={pageIndex}>
					{page.items.map((comment) => (
						<ErrorBoundary
							key={comment.id}
							fallback={(error) => <CommentError error={error} />}
						>
							<CommentItem
								comment={comment}
								postId={postId}
								currentUser={user}
							/>
						</ErrorBoundary>
					))}
				</React.Fragment>
			))}
			{hasNextPage && (
				<Box ref={infiniteScrollRef} minHeight='4'>
					{isFetchingNextPage && <LoadingSpinner size='small' />}
				</Box>
			)}
		</Container>
	);
};

export default Comments;
