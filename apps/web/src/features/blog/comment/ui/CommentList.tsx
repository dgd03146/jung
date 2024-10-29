import { CommentError, CommentStats } from '@/fsd/entities/comment';
import { LoadingSpinner, useSupabaseAuth } from '@/fsd/shared';
import { Box, Container } from '@jung/design-system';
import { ErrorBoundary } from '@jung/shared/ui';
import React from 'react';
import { useGetComments } from '../api';
import { calculateCommentCount } from '../lib';
import { useInfiniteScroll } from '../model';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface Props {
	postId: string;
	postLikeCount: number;
}

const CommentList = ({ postId, postLikeCount }: Props) => {
	const [data, query] = useGetComments(postId);
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

export default CommentList;
