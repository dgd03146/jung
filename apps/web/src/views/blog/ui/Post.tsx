import BlurImage from '@/fsd/shared/ui/BlurImage';
import {
	Card,
	Flex,
	Stack,
	Tag,
	Typography,
} from '@jung/design-system/components';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import * as styles from './Post.css';

// FIXME: types로 빼기
interface PostProps {
	id: string;
	imagesrc: string;
	date: string;
	tags: string[];
	title: string;
	description: string;
	link: string;
	index: number;
}

const Post = ({
	imagesrc,
	date,
	tags,
	id,
	title,
	description,
	// link,
	index,
}: PostProps) => {
	return (
		<Card variant='outline'>
			<Card.Media className={styles.imgContainer}>
				<BlurImage
					src={imagesrc}
					alt='Featured Image'
					fill
					priority={index <= 3}
				/>
				{/* <Image src={imagesrc} alt="Featured Image" fill priority={index <= 3} /> */}
			</Card.Media>
			<Card.Content rowGap='3'>
				<Flex columnGap='1'>
					<Tag rounded>{date}</Tag>
					{tags.map((tag, index) => (
						<Tag key={index} rounded>
							{tag}
						</Tag>
					))}
				</Flex>
				<Stack space='2' align={'left'} className={styles.textContainer}>
					<Card.Title>{title}</Card.Title>
					<Card.Description>{description}</Card.Description>
				</Stack>
				<Card.Actions>
					<Link href={`/blog/${id}` || '/not-found'} className={styles.link}>
						<Typography.Text level={3} color='primary'>
							read more
						</Typography.Text>
						<FaChevronRight size='12' color='#0142C0' />
						{/* <Button>read more</Button> */}
					</Link>
				</Card.Actions>
			</Card.Content>
		</Card>
	);
};

export default Post;
