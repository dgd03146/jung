import { Button, Card, Flex, Stack, Tag } from '@jung/design-system/components';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './Post.css';

// FIXME: types로 빼기
interface PostProps {
	imageSrc: string;
	date: string;
	tags: string[];
	title: string;
	description: string;
	link: string;
	index: number;
}

const Post = ({
	imageSrc,
	date,
	tags,
	title,
	description,
	link,
	index,
}: PostProps) => {
	return (
		<Card variant='outline'>
			<Card.Media className={styles.imgContainer}>
				<Image src={imageSrc} alt='Featured Image' fill priority={index <= 3} />
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
					<Link href={link}>
						<Button>read more</Button>
					</Link>
				</Card.Actions>
			</Card.Content>
		</Card>
	);
};

export default Post;
