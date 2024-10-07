import BlurImage from '@/fsd/shared/ui/BlurImage';
import {
	Box,
	Flex,
	Stack,
	Tag,
	Typography,
} from '@jung/design-system/components';
import type { Post } from '@jung/server/schemas/post';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import * as styles from './PostContent.css';

type Props = {
	post: Post;
};

const PostHeader = ({ post }: Props) => {
	return (
		<>
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
					<Flex columnGap='1'>
						<Tag rounded>{post.date}</Tag>
						<Tag rounded>{post.category}</Tag>
					</Flex>
					<Typography.Heading level={1}>{post.title}</Typography.Heading>

					<Typography.Text level={3}>{post.description}</Typography.Text>
					<Flex columnGap='4' alignItems='center' marginTop='2'>
						<Flex alignItems='center' columnGap='1'>
							<FaRegComment size={18} color='#0142C0' />
							<Typography.SubText level={2} color='primary'>
								{/* {post.likeCount || 0} */}
								{100}
							</Typography.SubText>
						</Flex>
						<Flex alignItems='center' columnGap='1'>
							<FaRegHeart size={18} color='#0142C0' />
							<Typography.SubText level={2} color='primary'>
								{/* {post.likeCount || 0} */}
								{100}
							</Typography.SubText>
						</Flex>
					</Flex>
				</Stack>
			</Flex>
		</>
	);
};

export default PostHeader;
