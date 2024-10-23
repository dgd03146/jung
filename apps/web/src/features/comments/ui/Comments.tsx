import LoadingSpinner from '@/fsd/shared/ui/LoadingSpinner';
import { Box, Container } from '@jung/design-system/components';
import { useGetCommentsQuery } from '../api/useGetComments';
import { calculateCommentCount } from '../lib';
import { useInfiniteScroll } from '../model/useInfiniteScroll';
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

	const comments = data?.pages.flatMap((page) => page.items) || [];
	const commentCount = calculateCommentCount(comments);
	const infiniteScrollRef = useInfiniteScroll(hasNextPage, fetchNextPage);

	return (
		<Container marginY='20'>
			<CommentStats commentCount={commentCount} likeCount={postLikeCount} />
			<CommentForm postId={postId} />
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
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
