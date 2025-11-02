import { Box, Flex, Stack } from '@jung/design-system/components';
import * as styles from './PostHeaderSkeleton.css';

export const PostHeaderSkeleton = () => {
	return (
		<Box
			className={styles.headerContainer}
			paddingBottom={{ base: '4', laptop: '6' }}
		>
			<Flex columnGap='10' className={styles.contentFlex}>
				<Box
					className={styles.imgContainer}
					display={{ base: 'none', laptop: 'block' }}
				>
					<Box background='gray' height='full' borderRadius='xl' />
				</Box>

				<Stack
					align={'left'}
					rowGap={{ base: '2', laptop: '4' }}
					flex={1}
					className={styles.contentStack}
				>
					<Box
						width='20'
						height='6'
						background='gray'
						borderRadius='md'
						className={styles.dateSkeleton}
					/>

					<Box
						width='full'
						height='10'
						background='gray'
						borderRadius='md'
						className={styles.titleSkeleton}
					/>
					<Box
						width='4/5'
						height='10'
						background='gray'
						borderRadius='md'
						className={styles.titleSkeleton}
					/>

					<Box
						width='full'
						height='6'
						background='gray'
						borderRadius='md'
						className={styles.descriptionSkeleton}
					/>
					<Box
						width='4/5'
						height='6'
						background='gray'
						borderRadius='md'
						className={styles.descriptionSkeleton}
					/>

					<Box
						width='20'
						height='6'
						background='gray'
						borderRadius='md'
						className={styles.categorySkeleton}
					/>
				</Stack>
			</Flex>
		</Box>
	);
};
