import { Box, Flex, Grid, Stack } from '@jung/design-system/components';
import * as styles from './CategorySkeleton.css';

interface CategorySkeletonProps {
	cardCount?: number;
}

export function CategorySkeleton({ cardCount = 8 }: CategorySkeletonProps) {
	return (
		<Stack space='6'>
			<Grid
				gridTemplateColumns={{
					base: '1',
					tablet: '1/2',
				}}
				gap='4'
			>
				{/* Stats Cards */}
				{[1, 2].map((i) => (
					<Box
						key={i}
						background='white'
						borderRadius='2xl'
						padding='6'
						borderWidth='hairline'
						borderStyle='solid'
						borderColor='gray'
					>
						<Stack space='2'>
							<Box
								height='8'
								width='20'
								background='gray'
								borderRadius='lg'
								className={styles.shimmer}
							/>
							<Box
								height='4'
								width='28'
								background='gray'
								borderRadius='lg'
								className={styles.shimmer}
							/>
						</Stack>
					</Box>
				))}
			</Grid>

			<Box
				background='white'
				borderRadius='2xl'
				borderWidth='hairline'
				borderStyle='solid'
				borderColor='gray'
				overflow='hidden'
			>
				{/* Header */}
				<Flex
					justify='space-between'
					align='center'
					padding='5'
					borderBottomWidth='hairline'
					borderStyle='solid'
					borderColor='gray'
				>
					<Box
						height='6'
						width='45'
						background='gray'
						borderRadius='lg'
						className={styles.shimmer}
					/>
					<Box
						height='10'
						width='28'
						background='gray'
						borderRadius='lg'
						className={styles.shimmer}
					/>
				</Flex>

				{/* Grid */}
				<Grid
					gridTemplateColumns={{
						base: '1',
						tablet: 'auto-fit',
					}}
					gap='5'
					padding='6'
				>
					{Array.from({ length: cardCount }, (_, i) => (
						<Box
							key={i}
							background='white'
							borderRadius='xl'
							borderStyle='solid'
							borderTopWidth='hairline'
							borderColor='gray300'
						>
							<Flex justify='space-between' align='center' padding='4'>
								<Box
									height='5'
									width='32'
									background='gray'
									borderRadius='lg'
									className={styles.shimmer}
								/>
								<Box
									height='7'
									width='16'
									background='gray'
									borderRadius='lg'
									className={styles.shimmer}
								/>
							</Flex>

							<Box padding='4'>
								{[1, 2].map((i) => (
									<Box
										key={i}
										height='4'
										width='full'
										background='gray'
										borderRadius='lg'
										marginBottom='2'
										className={styles.shimmer}
									/>
								))}
							</Box>

							<Box
								padding='3'
								paddingX='4'
								borderTopWidth='hairline'
								borderStyle='solid'
								borderColor='gray'
								background='gray'
							>
								<Box
									height='4'
									width='12'
									background='gray'
									borderRadius='lg'
									className={styles.shimmer}
								/>
							</Box>
						</Box>
					))}
				</Grid>
			</Box>
		</Stack>
	);
}
