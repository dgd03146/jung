import { useGetAdjacentPosts } from '@/fsd/features/blog/post';
import { Flex, Stack, Typography } from '@jung/design-system';
import Link from 'next/link';
import { BiLogoGmail } from 'react-icons/bi';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { IoArrowUndoSharp } from 'react-icons/io5';
import * as styles from './PostSidebar.css';

const PostSidebar = ({ postId, tags }: { postId: string; tags: string[] }) => {
	const { data: adjacentPosts } = useGetAdjacentPosts(postId);

	return (
		<Stack
			space='12'
			align='left'
			minWidth='60'
			position='sticky'
			top={80}
			height='screenDvh'
			display={{ mobile: 'none', laptop: 'flex' }}
		>
			<Flex
				minWidth='60'
				align='center'
				gap='1'
				color='primary'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				<a href='mailto:ibory1220@gmail.com' className={styles.externalLink}>
					<BiLogoGmail size={16} />
				</a>
				<a
					href='https://www.linkedin.com/in/dgd03146/'
					className={styles.externalLink}
				>
					<BsLinkedin size={16} />
				</a>
				<a href='https://github.com/dgd03146' className={styles.externalLink}>
					<FaGithub size={16} />
				</a>
			</Flex>

			<Stack
				space='1'
				align='left'
				minWidth='60'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				<Typography.SubText level={2} className={styles.sidebarHeader}>
					Tags
				</Typography.SubText>
				<Flex columnGap='2' wrap='wrap' rowGap='2'>
					{tags.map((tag) => (
						<div key={tag} className={styles.tag}>
							{tag}
						</div>
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
					<Typography.SubText level={2} className={styles.sidebarHeader}>
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
					borderColor='primary50'
					borderStyle='solid'
					paddingBottom='8'
				>
					<Typography.SubText level={2} className={styles.sidebarHeader}>
						Next Post
					</Typography.SubText>
					<Link href={`/blog/${adjacentPosts.next.id}`}>
						<Typography.Text level={3} className={styles.adjacentPostTitle}>
							{adjacentPosts.next.title}
						</Typography.Text>
					</Link>
				</Stack>
			)}

			<Link href='/blog' className={styles.linkText}>
				<IoArrowUndoSharp className={styles.linkTextIcon} />
				<p>Back to the post</p>
			</Link>
		</Stack>
	);
};

export default PostSidebar;
