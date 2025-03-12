import { BlurImage } from '@/fsd/shared';
import { SOCIAL_LINKS } from '@/fsd/shared/config';
import { Box, Flex, Typography } from '@jung/design-system';
import type { AdjacentPosts } from '@jung/shared/types';
import Link from 'next/link';
import { IoArrowUndoSharp } from 'react-icons/io5';
import logo from '/public/images/logo.png';
import * as styles from './PostNavigation.css';
import { PostTags } from './PostTags';

interface Props {
	adjacentPosts: AdjacentPosts;
	tags: string[];
}

const PostNavigation = ({ adjacentPosts, tags }: Props) => {
	return (
		<Box className={styles.sidebar}>
			<Flex
				position={{ laptop: 'sticky' }}
				top={{ laptop: 80 }}
				flexDirection={{ base: 'row', laptop: 'column' }}
				flexWrap={{ base: 'wrap-reverse', laptop: 'nowrap' }}
				alignItems={{ base: 'center', laptop: 'flex-start' }}
				justifyContent={{ base: 'space-between', laptop: 'flex-start' }}
			>
				<Flex
					align='center'
					color='primary'
					paddingBottom={{ laptop: '6' }}
					display={{ base: 'none', laptop: 'flex' }}
					minWidth={{ laptop: '60' }}
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
					<BlurImage src={logo} alt='logo' width={60} height={60} />
				</Flex>

				<Flex
					display={{ base: 'none', laptop: 'flex' }}
					direction='column'
					gap='1'
					minWidth={{ laptop: '60' }}
					borderTopWidth={{ laptop: 'hairline' }}
					borderBottomWidth={{ laptop: 'hairline' }}
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
					<PostTags tags={tags} />
				</Flex>

				{adjacentPosts.previous && (
					<Flex
						direction='column'
						gap='1'
						minWidth={{ laptop: '60' }}
						borderTopWidth={{ laptop: 'hairline' }}
						borderBottomWidth={{ laptop: 'hairline' }}
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
								color={{ hover: 'primary200' }}
								truncate='two'
								transition='fast'
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
						minWidth={{ laptop: '60' }}
						borderTopWidth={{ laptop: 'hairline' }}
						borderBottomWidth={{ laptop: 'hairline' }}
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
								color={{ hover: 'primary200' }}
								truncate='two'
								transition='fast'
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
						color={{ base: 'primary', hover: 'primary200' }}
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
