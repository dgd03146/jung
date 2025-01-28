import { useGetAdjacentPosts } from '@/fsd/features/blog/post';
import { SOCIAL_LINKS } from '@/fsd/shared/config';
import { Box, Flex, Stack, Tag, Typography } from '@jung/design-system';
import Link from 'next/link';
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
				gap='2'
				color='primary'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				{SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
					<Box
						key={href}
						as='a'
						href={href}
						aria-label={label}
						target='_blank'
						rel='noopener noreferrer'
						color={{
							base: 'primary',
							hover: 'primary200',
						}}
						transition='fast'
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

			<Stack
				space='1'
				align='left'
				minWidth='60'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				<Typography.Text
					level={1}
					color='primary'
					fontWeight='semibold'
					className={styles.sidebarHeader}
				>
					Tags
				</Typography.Text>
				<Flex columnGap='2' wrap='wrap' rowGap='2'>
					{tags.map((tag) => (
						<Tag variant='secondary' key={tag}>
							<Typography.FootNote level={1}># {tag}</Typography.FootNote>
						</Tag>
					))}
				</Flex>
			</Stack>

			{adjacentPosts?.previous && (
				<Stack
					minWidth='60'
					space='1'
					align='left'
					borderBottomWidth='hairline'
					borderColor='gray'
					borderStyle='solid'
					paddingBottom='8'
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
							color={{ hover: 'primary200' }}
							truncate='two'
							transition='fast'
						>
							{adjacentPosts.previous.title}
						</Typography.Text>
					</Link>
				</Stack>
			)}

			{adjacentPosts?.next && (
				<Stack
					minWidth='60'
					space='1'
					align='left'
					borderBottomWidth='hairline'
					borderColor='primary50'
					borderStyle='solid'
					paddingBottom='8'
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
							color={{ hover: 'primary200' }}
							truncate='two'
							transition='fast'
						>
							{adjacentPosts.next.title}
						</Typography.Text>
					</Link>
				</Stack>
			)}

			<Link href='/blog'>
				<Flex
					gap='2'
					align='center'
					color={{ base: 'primary', hover: 'primary200' }}
				>
					<IoArrowUndoSharp style={{ transform: 'translateY(-2px)' }} />
					<Typography.Text
						level={1}
						transition='fast'
						fontWeight='semibold'
						className={styles.linkText}
					>
						Back to the post
					</Typography.Text>
				</Flex>
			</Link>
		</Stack>
	);
};

export default PostSidebar;
