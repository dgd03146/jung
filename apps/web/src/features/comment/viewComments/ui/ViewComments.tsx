import {
	CommentList,
	CommentListSkeleton,
	CommentStats,
} from '@/fsd/entities/comment';
import { CreateCommentForm } from '@/fsd/features/comment/createComment/ui/CreateCommentForm';
import { useInfiniteScroll } from '@/fsd/shared';
import { LoadingSpinner } from '@/fsd/shared/ui';
import { Container } from '@jung/design-system/components';
import { Flex } from '@jung/design-system/components/Flex/Flex';
import type { Comment } from '@jung/shared/types';
import { Suspense } from 'react';
import { useCommentsQuery } from '../api/useCommentsQuery';
import { calculateCommentCount } from '../lib/calculateCommentCount';
import { CommentItem } from './CommentItem';

interface ViewCommentsProps {
	targetId: string;
	likeCount: number;
}

export const ViewComments = ({ targetId, likeCount }: ViewCommentsProps) => {
	const [data, query] = useCommentsQuery(targetId);
	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;
	const { ref } = useInfiniteScroll({ hasNextPage, fetchNextPage });

	const comments = data.pages.flatMap((page) => page.items) ?? [];

	const commentCount =
		data.pages.reduce(
			(acc, page) => acc + calculateCommentCount(page.items),
			0,
		) || 0;

	const renderItem = (comment: Comment) => (
		<CommentItem comment={comment} targetId={targetId} />
	);

	return (
		<Container marginY='10'>
			<CommentStats commentCount={commentCount} likeCount={likeCount} />
			<CreateCommentForm targetId={targetId} />
			<Suspense fallback={<CommentListSkeleton />}>
				<CommentList comments={comments} renderItem={renderItem} />
			</Suspense>
			<Flex justify='center' align='center' ref={ref} minHeight='4'>
				{isFetchingNextPage && hasNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</Container>
	);
};
