import { Flex, Stack, Tag, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { FaChevronLeft, FaTag } from 'react-icons/fa';
import * as styles from './PostSidebar.css';

import { useGetAdjacentPosts } from '@/fsd/features/blog/api/useGetAdjacentPosts';

const PostSidebar = ({ postId, tags }: { postId: string; tags: string[] }) => {
	const { data: adjacentPosts } = useGetAdjacentPosts(postId);

	return (
		<Stack
			space='12'
			align='left'
			minWidth='60'
			position='sticky'
			top={0}
			display={{ mobile: 'none', laptop: 'flex' }}
		>
			<Stack
				space='2'
				align='left'
				minWidth='60'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				<Typography.SubText level={2} color='primary'>
					Tags
				</Typography.SubText>
				<Flex columnGap='2' wrap='wrap' rowGap='2'>
					{tags.map((tag) => (
						<Tag
							key={tag}
							color='primary'
							variant='ghost'
							display='flex'
							alignItems='center'
							borderRadius='md'
							boxShadow='primary'
						>
							<FaTag style={{ marginRight: '6px', fontSize: '0.75em' }} />
							{tag}
						</Tag>
					))}
				</Flex>
			</Stack>

			{adjacentPosts?.previous && (
				<Stack
					space='1'
					align='left'
					borderBottomWidth='hairline'
					borderColor='gray'
					borderStyle='solid'
					paddingBottom='8'
				>
					<Typography.SubText level={2} color='primary'>
						Previous Post
					</Typography.SubText>
					<Link href={`/blog/${adjacentPosts.previous.id}`}>
						<Typography.Text level={3} className={styles.adjacentPostTitle}>
							{adjacentPosts.previous.title}
						</Typography.Text>
					</Link>
				</Stack>
			)}

			{adjacentPosts?.next && (
				<Stack
					space='1'
					align='left'
					borderBottomWidth='hairline'
					borderColor='gray'
					borderStyle='solid'
					paddingBottom='8'
				>
					<Typography.SubText level={2} color='primary'>
						Next Post
					</Typography.SubText>
					<Link href={`/blog/${adjacentPosts.next.id}`}>
						<Typography.Text level={3} className={styles.adjacentPostTitle}>
							{adjacentPosts.next.title}
						</Typography.Text>
					</Link>
				</Stack>
			)}

			<Link href='/blog' className={styles.link}>
				<FaChevronLeft size='12' color='#0142C0' />
				<Typography.Text level={3} color='primary'>
					Back to the post
				</Typography.Text>
			</Link>
		</Stack>
	);
};

export default PostSidebar;
