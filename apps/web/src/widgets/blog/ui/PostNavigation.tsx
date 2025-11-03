'use client';

import {
	PostTags,
	useAdjacentPostsQuery,
	usePostQuery,
} from '@/fsd/entities/blog';
import { SOCIAL_LINKS } from '@/fsd/shared/config';
import { Box, Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { IoArrowUndoSharp } from 'react-icons/io5';
import * as styles from './PostNavigation.css';

interface Props {
	postId: string;
}

const PostNavigation = ({ postId }: Props) => {
	const { data: post } = usePostQuery(postId);
	const { data: adjacentPosts } = useAdjacentPostsQuery(postId);

	return (
		<Box className={styles.sidebar}>
			<Flex
				className={styles.sidebarContainer}
				flexDirection={{ base: 'row', laptop: 'column' }}
				alignItems={{ base: 'center', laptop: 'flex-start' }}
				justifyContent={{ base: 'space-between', laptop: 'flex-start' }}
			>
				<Flex
					align='center'
					color='primary'
					paddingBottom={{ laptop: '6' }}
					display={{ base: 'none', laptop: 'flex' }}
					gap='2'
				>
					{SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
						<Box
							key={href}
							as='a'
							href={href}
							aria-label={label}
							target='_blank'
							rel='noopener noreferrer'
							className={styles.SocialIconContainer}
							background='primary50'
							paddingY='1'
							paddingX='2'
							borderRadius='xs'
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<Icon size={16} />
						</Box>
					))}
				</Flex>

				{post?.tags && (
					<Flex
						className={styles.tagsContainer}
						display={{ base: 'none', laptop: 'flex' }}
						direction='column'
						gap='1'
						borderColor='gray'
						borderStyle='solid'
						paddingY={{ laptop: '8' }}
					>
						<Typography.Text
							level={1}
							color='primary'
							fontWeight='semibold'
							className={styles.sidebarHeader}
						>
							Tags
						</Typography.Text>
						<PostTags tags={post.tags} />
					</Flex>
				)}

				{adjacentPosts.previous && (
					<Flex
						direction='column'
						gap='1'
						className={styles.adjacentPostContainer}
						borderColor='gray'
						borderStyle='solid'
						paddingY={{ laptop: '8' }}
					>
						<Typography.Text
							level={1}
							color='primary'
							fontWeight='semibold'
							className={styles.sidebarHeader}
						>
							Previous Post
						</Typography.Text>
						<Link href={`/blog/${adjacentPosts.previous.id}`}>
							<Typography.Text
								level={3}
								className={styles.adjacentPostTitle}
								truncate='two'
							>
								{adjacentPosts.previous.title}
							</Typography.Text>
						</Link>
					</Flex>
				)}

				{adjacentPosts.next && (
					<Flex
						direction='column'
						gap='1'
						className={styles.adjacentPostContainer}
						borderColor='gray'
						borderStyle='solid'
						paddingY={{ laptop: '8' }}
					>
						<Typography.Text
							level={1}
							color='primary'
							fontWeight='semibold'
							className={styles.sidebarHeader}
						>
							Next Post
						</Typography.Text>
						<Link href={`/blog/${adjacentPosts.next.id}`}>
							<Typography.Text
								level={3}
								className={styles.adjacentPostTitle}
								truncate='two'
							>
								{adjacentPosts.next.title}
							</Typography.Text>
						</Link>
					</Flex>
				)}

				<Link href='/blog'>
					<Flex
						align='center'
						gap='1'
						className={styles.backButton}
						marginTop={{ laptop: '8' }}
					>
						<IoArrowUndoSharp
							size={18}
							style={{ transform: 'translateY(-2px)' }}
						/>
						<Typography.Text level={1} fontWeight='semibold'>
							Back to the post
						</Typography.Text>
					</Flex>
				</Link>
			</Flex>
		</Box>
	);
};

export default PostNavigation;
