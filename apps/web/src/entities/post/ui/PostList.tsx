'use client';

import type { ViewMode } from '@/fsd/entities/post';
import { PostCard } from '@/fsd/entities/post/ui';
import { EmptyState } from '@/fsd/shared/ui';
import { Box } from '@jung/design-system';
import type { Post } from '@jung/shared/types';
import * as styles from './PostList.css';

interface PostListProps {
	viewMode: ViewMode;
	posts: Post[];
}

const PostList = ({ viewMode, posts }: PostListProps) => {
	if (posts.length === 0) {
		return <EmptyState />;
	}

	return (
		<Box className={styles.postList({ viewMode })}>
			{posts.map((post, index) => (
				<PostCard key={post.id} post={post} index={index} viewMode={viewMode} />
			))}
		</Box>
	);
};

export default PostList;
