import { Box, Flex } from '@jung/design-system/components';
import * as styles from './PhotoDetail.css';

export function PhotoDetailSkeleton() {
	return (
		<div className={styles.container}>
			<div className={styles.imageWrapper}>
				<Box
					width='full'
					height='full'
					background='gray100'
					style={{ aspectRatio: '16/9' }}
				/>
			</div>

			<div className={styles.content}>
				<Box className={styles.header}>
					<Box height='6' width='3/5' background='gray100' borderRadius='md' />
				</Box>

				<Box className={styles.description}>
					<Box
						height='4'
						width='full'
						background='gray100'
						borderRadius='md'
						marginBottom='2'
					/>
					<Box height='4' width='4/5' background='gray100' borderRadius='md' />
				</Box>

				<Flex gap='2'>
					{[1, 2, 3].map((i) => (
						<Box
							key={i}
							height='5'
							width='20'
							background='gray100'
							borderRadius='full'
						/>
					))}
				</Flex>

				<Box className={styles.interactionSection}>
					<Box height='4' width='3/5' background='gray100' borderRadius='md' />

					<Flex gap='2'>
						<Box
							height='6'
							width='6'
							background='gray100'
							borderRadius='full'
						/>
						<Box
							height='6'
							width='6'
							background='gray100'
							borderRadius='full'
						/>
					</Flex>
				</Box>
			</div>
		</div>
	);
}
