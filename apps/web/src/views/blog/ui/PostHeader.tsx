import { formatDate } from '@/fsd/shared/lib';
import BlurImage from '@/fsd/shared/ui/BlurImage';
import {
	Box,
	Flex,
	Stack,
	Tag,
	Typography,
} from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import * as styles from './PostContent.css';

type Props = {
	post: Post;
};

const PostHeader = ({ post }: Props) => {
	return (
		<Flex
			columnGap='10'
			borderBottomWidth='hairline'
			borderColor='gray'
			borderStyle='solid'
			paddingBottom='8'
		>
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
			<Stack space={'0'} align={'left'} rowGap='4'>
				<Typography.SubText level={2} color='primary'>
					{formatDate(post.date)}
				</Typography.SubText>
				<Typography.Heading level={1}>{post.title}</Typography.Heading>
				<Typography.Text level={3}>{post.description}</Typography.Text>
				<Tag rounded>{post.category}</Tag>
			</Stack>
		</Flex>
	);
};

export default PostHeader;
