import { EditorSkeleton } from '@/fsd/shared';
import { Box, Container } from '@jung/design-system/components';
import * as styles from './PostDetailContentSkeleton.css';

export const PostDetailContentSkeleton = () => {
	return (
		<Container flex={1} maxWidth='180' className={styles.container}>
			{/* 에디터 스켈레톤 */}

			<EditorSkeleton />

			{/* 좋아요 버튼 스켈레톤 */}
			<Box background='gray' className={styles.likeButtonSkeleton} />

			{/* 댓글 섹션 스켈레톤 */}
			<Box background='gray' className={styles.commentHeader} />

			<Box background='gray' className={styles.commentsSkeleton} />
		</Container>
	);
};
