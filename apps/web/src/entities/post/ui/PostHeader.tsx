'use client';

import { usePostQuery } from '@/fsd/entities/post';
import { BlurImage, capitalizeFirstLetter, formatDate } from '@/fsd/shared';
import { Box, Flex, Stack, Typography } from '@jung/design-system/components';
import * as styles from './PostHeader.css';

type Props = {
	postId: string;
};

const PostHeader = ({ postId }: Props) => {
	const { data: post } = usePostQuery(postId);

	if (!post) {
		throw new Error('Post not found');
	}
	return (
		<Box
			className={styles.container}
			borderColor='gray'
			borderStyle='solid'
			paddingBottom={{ base: '4', laptop: '6' }}
		>
			<Flex columnGap='12'>
				<Box
					className={styles.imgContainer}
					display={{ base: 'none', laptop: 'block' }}
				>
					<BlurImage
						src={post.imagesrc}
						alt='Featured Image'
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						priority
					/>
				</Box>
				<Stack align={'left'} rowGap={{ base: '2', laptop: '4' }} flex={1}>
					<Typography.SubText level={3} color='primary'>
						{formatDate(post.date)}
					</Typography.SubText>
					<Typography.Heading level={3}>{post.title}</Typography.Heading>
					<Typography.Text
						level={3}
						color='primary300'
						marginBottom='4'
						truncate='two'
					>
						{post.description}
					</Typography.Text>
					<Typography.Text
						className={styles.category}
						background='primary50'
						color='primary'
					>
						{capitalizeFirstLetter(post.category)}
					</Typography.Text>
				</Stack>
			</Flex>
		</Box>
	);
};

export default PostHeader;
