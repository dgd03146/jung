import {
	Card,
	Container,
	Flex,
	Tag,
	Typography,
} from '@jung/design-system/components';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import * as styles from './FeaturedPost.css';

const Featured = () => {
	return (
		<Container>
			<Card layout='horizontal' variant='outline' alignItems='center' gap='10'>
				<Card.Media className={styles.imgContainer}>
					<Image
						src='https://images.unsplash.com/photo-1721197709662-615338eda4be?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Featured Image'
						priority
						fill
					/>
				</Card.Media>
				<Card.Content className={styles.textContainer}>
					<Flex columnGap='1'>
						<Tag rounded>2022.07.06</Tag>
						<Tag rounded>hihi</Tag>
						<Tag rounded>hihi</Tag>
					</Flex>
					<Card.Title fontSize='2xl'>오늘하루는 어땠는가?!?!</Card.Title>
					<Card.Description level={3}>
						Listen to music or podcast i really enojy doing that especially for
						winter.. taht is quite tricky mabye i would say my fav things to do
						list to music
					</Card.Description>
					<Card.Actions alignItems='center'>
						<Link href={'/blog/a'} className={styles.link}>
							<Typography.Text level={3} color='primary'>
								read more
							</Typography.Text>
							<FaChevronRight size='12' color='#0142C0' />
						</Link>
						{/* <Button>read more</Button> */}
					</Card.Actions>
				</Card.Content>
			</Card>
		</Container>
	);
};

export default Featured;
