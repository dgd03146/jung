// 'use client';

// import { usePostsQuery } from '@/fsd/features';
// import BlurImage from '@/fsd/shared/ui/BlurImage';
// import {
// 	Card,
// 	Container,
// 	Flex,
// 	Tag,
// 	Typography,
// } from '@jung/design-system/components';
// import Link from 'next/link';
// import { FaChevronRight } from 'react-icons/fa';
// import * as styles from './FeaturedPost.css';

// const FeaturedPost = () => {
// 	const [data] = usePostsQuery();

// 	const featuredPost = data[0];

// 	return (
// 		<Container>
// 			<Card layout='horizontal' variant='outline' alignItems='center' gap='10'>
// 				<Card.Media className={styles.imgContainer}>
// 					<BlurImage
// 						src={featuredPost?.imagesrc || ''}
// 						alt='Featured Image'
// 						priority
// 						fill
// 					/>
// 				</Card.Media>
// 				<Card.Content className={styles.textContainer}>
// 					<Flex columnGap='1'>
// 						<Tag rounded>{featuredPost?.date}</Tag>
// 						{featuredPost?.tags.map((tag) => (
// 							<Tag key={tag} rounded>
// 								{tag}
// 							</Tag>
// 						))}
// 					</Flex>
// 					<Card.Title fontSize='2xl'>{featuredPost?.title}</Card.Title>
// 					<Card.Description level={3}>
// 						{featuredPost?.description}
// 					</Card.Description>
// 					<Card.Actions alignItems='center'>
// 						<Link href={`/blog/${featuredPost?.id}`} className={styles.link}>
// 							<Typography.Text level={3} color='primary'>
// 								read more
// 							</Typography.Text>
// 							<FaChevronRight size='12' color='#0142C0' />
// 						</Link>
// 						{/* <Button>read more</Button> */}
// 					</Card.Actions>
// 				</Card.Content>
// 			</Card>
// 		</Container>
// 	);
// };

// export default FeaturedPost;
