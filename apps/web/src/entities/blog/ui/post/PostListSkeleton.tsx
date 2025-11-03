import { Box, Container } from '@jung/design-system/components';
import * as styles from './PostListSkeleton.css';

const PostCardSkeleton = () => {
	return (
		<article className={styles.postCard}>
			<div className={styles.imageArea}>
				<Box background='gray' height='full' borderRadius='xl' />
			</div>

			<div className={styles.contentArea}>
				<div className={styles.meta}>
					<Box width='20' height='6' background='gray' borderRadius='md' />
					<Box width='24' height='5' background='gray' borderRadius='md' />
				</div>

				<Box
					width='4/5'
					height='8'
					background='gray'
					borderRadius='md'
					className={styles.titleSkeleton}
				/>

				<Box
					width='full'
					height='12'
					background='gray'
					borderRadius='md'
					className={styles.descriptionSkeleton}
				/>

				<div className={styles.tagList}>
					{Array.from({ length: 2 }).map((_, index) => (
						<Box
							key={index}
							width='20'
							height='6'
							background='gray'
							borderRadius='md'
							className={styles.tagSkeleton}
						/>
					))}
				</div>
			</div>
		</article>
	);
};

const PostListSkeleton = ({ count = 3 }: { count: number }) => {
	return (
		<Container>
			{/* <div className={styles.searchAreaSkeleton}>
        <Box
          width="full"
          height="8"
          background="gray"
          borderRadius="lg"
          className={styles.searchBarSkeleton}
        />
        <Box
          width="24"
          height="8"
          background="gray"
          borderRadius="lg"
          className={styles.viewToggleSkeleton}
        />
      </div> */}

			<div className={styles.skeletonList}>
				{Array.from({ length: count }).map((_, index) => (
					<PostCardSkeleton key={index} />
				))}
			</div>
		</Container>
	);
};

export default PostListSkeleton;
