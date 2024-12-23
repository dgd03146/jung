import { BlurImage, formatDate } from '@/fsd/shared';
import { capitalizeFirstLetter } from '@/fsd/shared';
import { Box, Flex, Stack, Typography } from '@jung/design-system';
import type { Post } from '@jung/shared/types';
import * as styles from './PostHeader.css';

type Props = {
	post: Post;
};

const PostHeader = ({ post }: Props) => {
	return (
		<Box className={styles.postHeaderContainer}>
			<Flex columnGap='10'>
				<Box
					className={styles.imgContainer}
					display={{ mobile: 'none', laptop: 'block' }}
				>
					<BlurImage
						src={post.imagesrc}
						alt='Featured Image'
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						priority
					/>
				</Box>
				<Stack space={'0'} align={'left'} rowGap='4' flex='1'>
					<Typography.SubText level={2} className={styles.date}>
						{formatDate(post.date)}
					</Typography.SubText>
					<Typography.Heading level={3}>{post.title}</Typography.Heading>
					<Typography.Text level={3} className={styles.description}>
						{post.description}
					</Typography.Text>
					<p className={styles.category}>
						{capitalizeFirstLetter(post.category)}
					</p>
				</Stack>
			</Flex>
		</Box>
	);
};

export default PostHeader;
