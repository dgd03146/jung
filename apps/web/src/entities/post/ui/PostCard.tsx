import { BlurImage, capitalizeFirstLetter, formatDate } from '@/fsd/shared';
import { Box, Flex, Typography } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import Link from 'next/link';
import { BsFillPlayFill } from 'react-icons/bs';
import type { ViewMode } from '../model/view';
import * as styles from './PostCard.css';
import { PostTags } from './PostTags';

interface PostCardProps {
	post: Post;
	index?: number;
	viewMode: ViewMode;
}

const PostCard = ({ post, index, viewMode }: PostCardProps) => {
	const renderTableView = () => (
		<>
			<Flex align='center' gap='4'>
				<TableIndex index={index} />
				<BlurImage
					src={post.imagesrc}
					alt={post.title}
					width={40}
					height={40}
				/>
			</Flex>
			<Flex direction='column' gap='1' flex={1}>
				<Typography.Text
					truncate='single'
					fontWeight='medium'
					className={styles.title}
				>
					{post.title}
				</Typography.Text>
				<Typography.SubText level={3} truncate='single'>
					{post.description}
				</Typography.SubText>
			</Flex>
			<Flex
				align='center'
				gap='2'
				justify='flex-end'
				flex={1}
				color='primary'
				display={{ mobile: 'none', tablet: 'flex' }}
			>
				<Typography.Text
					className={styles.category}
					background='primary50'
					color='primary'
				>
					{capitalizeFirstLetter(post.category)}
				</Typography.Text>
				<Typography.SubText level={3}>
					{formatDate(post.date)}
				</Typography.SubText>
			</Flex>
		</>
	);

	const renderDefaultView = () => (
		<>
			<Box className={styles.imageArea({ viewMode })}>
				<BlurImage
					src={post.imagesrc}
					alt={post.title}
					fill
					sizes={
						viewMode === 'list'
							? '(max-width: 480px) 180px, (max-width: 768px) 200px, 200px'
							: '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw'
					}
					priority={index !== undefined && index <= 3}
				/>
			</Box>
			<Flex
				flexDirection='column'
				flex={1}
				gap='3'
				className={styles.contentArea({ viewMode })}
			>
				<Flex gap='3' align='center' marginTop='1' color='primary'>
					<Typography.Text className={styles.category} background='primary50'>
						{capitalizeFirstLetter(post.category)}
					</Typography.Text>
					<Typography.SubText level={3}>
						{formatDate(post.date)}
					</Typography.SubText>
				</Flex>

				<Typography.Heading as='h1' level={4}>
					{post.title}
				</Typography.Heading>

				<Typography.Text
					level={3}
					color='primary300'
					marginBottom='4'
					truncate='two'
				>
					{post.description}
				</Typography.Text>

				{post.tags && (
					<Box marginTop='auto'>
						<PostTags tags={post.tags} />
					</Box>
				)}
			</Flex>
		</>
	);

	return (
		<Box as='article' className={styles.postCard({ viewMode })}>
			<Link href={`/blog/${post.id}`} className={styles.postLink}>
				{viewMode === 'table' ? renderTableView() : renderDefaultView()}
			</Link>
		</Box>
	);
};

export default PostCard;

const TableIndex = ({ index }: { index?: number }) => {
	if (typeof index !== 'number') return null;

	return (
		<Flex
			position='relative'
			width='6'
			height='6'
			justify='center'
			align='center'
		>
			<Typography.Text
				level={4}
				color='primary'
				fontWeight='medium'
				position='absolute'
				className={styles.tableNumber}
			>
				{index + 1}
			</Typography.Text>
			<Flex
				align='center'
				justify='center'
				color='primary'
				position='absolute'
				className={styles.playButton}
			>
				<BsFillPlayFill size={20} />
			</Flex>
		</Flex>
	);
};
