import { Box, Flex } from '@jung/design-system/components';
import * as styles from './PhotoDetailSkeleton.css';

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
				<Flex gap='1' flexDirection='column'>
					<Box height='6' width='3/5' background='gray100' borderRadius='md' />
				</Flex>

				<Box>
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

				<Flex paddingY='4' justify='space-between' align='center'>
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
				</Flex>
			</div>
		</div>
	);
}
