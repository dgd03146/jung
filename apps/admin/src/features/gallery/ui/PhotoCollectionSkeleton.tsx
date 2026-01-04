import { Box, Flex, Stack } from '@jung/design-system/components';
import * as styles from './PhotoCollectionSkeleton.css';

export const PhotoCollectionSkeleton = () => {
	return (
		<Box padding='6'>
			<Stack space='6'>
				<Box
					padding='6'
					borderRadius='lg'
					borderWidth='hairline'
					borderStyle='solid'
					borderColor='gray'
				>
					<Flex
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Box
							width='48'
							height='8'
							background='gray'
							borderRadius='md'
							className={styles.transition}
						/>
						<Box
							width='32'
							height='10'
							background='gray'
							borderRadius='md'
							className={styles.transition}
						/>
					</Flex>
				</Box>

				<Box className={styles.collectionGrid} gap='4'>
					{Array.from({ length: 8 }).map((_, index) => (
						<Box
							key={index}
							borderRadius='lg'
							borderWidth='hairline'
							borderStyle='solid'
							borderColor='gray'
							overflow='hidden'
						>
							<Box
								position='relative'
								width='full'
								height='48'
								background='gray'
								className={styles.transition}
							/>

							<Stack padding='4' space='2'>
								<Box
									width='3/5'
									height='6'
									background='gray'
									borderRadius='md'
									className={styles.transition}
								/>
								<Box
									width='full'
									height='8'
									background='gray'
									borderRadius='md'
									className={styles.transition}
								/>
							</Stack>

							<Flex
								className={styles.borderTop}
								paddingX='4'
								paddingY='3'
								justifyContent='space-between'
								alignItems='center'
								borderColor='gray'
								borderStyle='solid'
							>
								<Box
									width='20'
									height='4'
									background='gray'
									borderRadius='md'
									className={styles.transition}
								/>
								<Box
									width='24'
									height='4'
									background='gray'
									borderRadius='md'
									className={styles.transition}
								/>
							</Flex>
						</Box>
					))}
				</Box>
			</Stack>
		</Box>
	);
};
