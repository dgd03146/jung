'use client';

import { useGetAdjacentPosts } from '@/fsd/features/blog/post';
import { Flex, Typography } from '@jung/design-system';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import * as styles from './PostNavigation.css';

interface PostNavigationProps {
	postId: string;
}

const PostNavigation = ({ postId }: PostNavigationProps) => {
	const { data: adjacentPosts } = useGetAdjacentPosts(postId);

	if (!adjacentPosts?.previous && !adjacentPosts?.next) return null;

	return (
		<Flex
			direction='column'
			display={{ mobile: 'flex', laptop: 'none' }}
			className={styles.container}
		>
			<Flex gap='4' className={styles.navigationWrapper}>
				{adjacentPosts?.previous && (
					<Link
						href={`/blog/${adjacentPosts.previous.id}`}
						className={styles.link}
					>
						<Flex
							direction='column'
							gap='2'
							className={styles.navItem}
							boxShadow='primary'
						>
							<Flex align='center' gap='2'>
								<FaChevronLeft size={12} className={styles.icon} />
								<Typography.SubText level={4} color='primary'>
									Previous Post
								</Typography.SubText>
							</Flex>
							<Typography.Text level={3} className={styles.title}>
								{adjacentPosts.previous.title}
							</Typography.Text>
						</Flex>
					</Link>
				)}

				{adjacentPosts?.next && (
					<Link href={`/blog/${adjacentPosts.next.id}`} className={styles.link}>
						<Flex
							direction='column'
							gap='2'
							className={styles.navItem}
							boxShadow='primary'
						>
							<Flex align='center' gap='2' justify='flex-end'>
								<Typography.SubText level={4} color='primary'>
									Next Post
								</Typography.SubText>
								<FaChevronRight size={12} className={styles.icon} />
							</Flex>
							<Typography.Text level={3} className={styles.title}>
								{adjacentPosts.next.title}
							</Typography.Text>
						</Flex>
					</Link>
				)}
			</Flex>

			<Link href='/blog' className={styles.backLink}>
				<Flex align='center' justify='center' gap='2'>
					<FaChevronLeft size={12} />
					<Typography.Text level={3}>Back to posts</Typography.Text>
				</Flex>
			</Link>
		</Flex>
	);
};

export default PostNavigation;
