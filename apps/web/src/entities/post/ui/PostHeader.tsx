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
					<Typography.SubText level={3} color='primary'>
						{formatDate(post.date)}
					</Typography.SubText>
					<Typography.Heading level={3}>{post.title}</Typography.Heading>
					<Typography.Text
						level={3}
						color='primary400'
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
						{capitalizeFirstLetter('category')}
					</Typography.Text>
				</Stack>
			</Flex>
		</Box>
	);
};

export default PostHeader;
