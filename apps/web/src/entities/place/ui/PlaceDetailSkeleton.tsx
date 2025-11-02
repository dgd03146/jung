import {
	Box,
	Container,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import * as styles from './PlaceDetailSkeleton.css';

export function PlaceDetailSkeleton() {
	return (
		<Container
			marginX='auto'
			boxShadow='primary'
			borderRadius='xl'
			marginY='10'
		>
			<Box className={styles.imageSection} />

			<Stack maxWidth='tablet' marginX='auto' padding='10' gap='5'>
				{/* Title */}
				<Box className={styles.titleSkeleton} />

				{/* Location */}
				<Flex gap='1' alignItems='center'>
					<Box className={styles.iconSkeleton} />
					<Box className={styles.locationSkeleton} />
				</Flex>

				{/* Action Bar */}
				<Flex
					justify='space-between'
					align='center'
					gap='4'
					className={styles.actionBarSkeleton}
					borderColor='primary50'
					borderStyle='solid'
					paddingY='4'
				>
					<Box className={styles.dateSkeleton} />
					<Flex gap='2'>
						<Box className={styles.actionButtonSkeleton} />
						<Box className={styles.actionButtonSkeleton} />
					</Flex>
				</Flex>

				<Stack space='10'>
					{/* Description */}
					<Box className={styles.descriptionSkeleton} />

					{/* Tags */}
					<Flex gap='2' wrap='wrap'>
						{Array.from({ length: 4 }).map((_, i) => (
							<Box key={i} className={styles.tagSkeleton} />
						))}
					</Flex>

					{/* Tips */}
					<Box>
						<Typography.Heading level={5} color='primary' marginBottom='4'>
							Tips
						</Typography.Heading>
						<Stack gap='3'>
							{Array.from({ length: 2 }).map((_, i) => (
								<Box key={i} className={styles.tipItemSkeleton} />
							))}
						</Stack>
					</Box>
				</Stack>
			</Stack>
		</Container>
	);
}
