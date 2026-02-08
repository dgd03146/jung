import { Box, Flex, Stack, Typography } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import {
	BlurImage,
	calculateReadingTime,
	capitalizeFirstLetter,
	formatDate,
} from '@/fsd/shared';
import * as styles from './PostHeader.css';

/**
 * PostHeader - Server Component
 *
 * Receives post data directly from parent instead of fetching via useQuery.
 * This reduces serialization overhead (only needed fields vs entire post object)
 * and eliminates client-side hydration for this component.
 *
 * @see Vercel Best Practices Rule 3.2: Minimize Serialization at RSC Boundaries
 */
type Props = {
	post: Pick<
		Post,
		'imagesrc' | 'date' | 'title' | 'description' | 'category' | 'content'
	>;
};

const PostHeader = ({ post }: Props) => {
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
						{formatDate(post.date)} · {calculateReadingTime(post.content)}
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
