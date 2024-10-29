import { Box, Card, Container, Grid } from '@jung/design-system';
import * as styles from './PostCard.css';

const PostSkeleton = () => {
	return (
		<Card variant='outline'>
			<Card.Media className={styles.imgContainer}>
				<Box background='gray' height='full' borderRadius='2xl' />
			</Card.Media>
			<Card.Content rowGap='3'>
				<Box width='2/3' background='gray' height='8' />
				<Box background='gray' width='full' height='8' />
				<Box background='gray' width='full' height='10' />
				<Box background='gray' width='1/5' height='6' />
			</Card.Content>
		</Card>
	);
};

const PostListSkeleton = ({ count = 4 }) => {
	return (
		<Container marginY='12'>
			<Grid
				columnGap='4'
				rowGap='8'
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					laptop: '1/3',
				}}
			>
				{Array.from({ length: count }).map((_, index) => (
					<PostSkeleton key={index} />
				))}
			</Grid>
		</Container>
	);
};

export default PostListSkeleton;
