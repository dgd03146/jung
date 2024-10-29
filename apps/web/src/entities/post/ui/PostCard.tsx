'use client';

import { BlurImage } from '@/fsd/shared';
import { formatDate } from '@/fsd/shared';
import { Card, Flex, Stack, Tag, Typography } from '@jung/design-system';
import type { Post } from '@jung/shared/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';
import * as styles from './PostCard.css';

const PostCard = ({
	imagesrc,
	date,

	id,
	title,
	category,
	description,
	index,
}: Post & { index: number }) => {
	const router = useRouter();

	return (
		<Card
			variant='outline'
			onClick={() =>
				router.push(`/blog/${id}` || '/not-found', { scroll: true })
			}
		>
			<Card.Media className={styles.imgContainer} cursor='pointer'>
				<BlurImage
					src={imagesrc}
					alt='Featured Image'
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					priority={index <= 3}
				/>
			</Card.Media>
			<Card.Content rowGap='3'>
				<Flex columnGap='1'>
					<Tag rounded>{formatDate(date)}</Tag>
					<Tag key={index} rounded>
						{category}
					</Tag>
				</Flex>
				<Stack space='2' align={'left'} className={styles.textContainer}>
					<Card.Title>{title}</Card.Title>
					<Card.Description>{description}</Card.Description>
				</Stack>
				<Card.Actions>
					<Link href={`/blog/${id}` || '/not-found'} className={styles.link}>
						<Typography.Text level={3} className={styles.linkText}>
							read more
						</Typography.Text>
						<FaChevronRight size='12' className={styles.linkIcon} />
					</Link>
				</Card.Actions>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
