import { Box, Flex } from '@jung/design-system/components';
import * as styles from './PostNavigationSkeleton.css';

export const PostNavigationSkeleton = () => {
	return (
		<Box className={styles.sidebar}>
			<Flex
				className={styles.sidebarContainer}
				flexDirection={{ base: 'row', laptop: 'column' }}
				flexWrap={{ base: 'wrap-reverse', laptop: 'nowrap' }}
				alignItems={{ base: 'center', laptop: 'flex-start' }}
				justifyContent={{ base: 'space-between', laptop: 'flex-start' }}
			>
				<Flex
					align='center'
					paddingBottom={{ laptop: '6' }}
					display={{ base: 'none', laptop: 'flex' }}
					gap='2'
					className={styles.socialContainer}
				>
					{Array(4)
						.fill(0)
						.map((_, index) => (
							<Box
								key={index}
								background='gray'
								className={styles.socialItem}
							/>
						))}

					<Box background='gray' className={styles.logoSkeleton} />
				</Flex>

				<Flex
					display={{ base: 'none', laptop: 'flex' }}
					direction='column'
					gap='1'
					paddingY={{ laptop: '8' }}
					className={styles.sidebarSection}
				>
					<Box background='gray' className={styles.sectionTitle} />

					<Box className={styles.tagContainer}>
						{Array(2)
							.fill(0)
							.map((_, index) => (
								<Box key={index} background='gray' className={styles.tag} />
							))}
					</Box>
				</Flex>

				<Flex
					direction='column'
					gap='1'
					paddingY={{ laptop: '8' }}
					className={styles.sidebarSection}
				>
					<Box background='gray' className={styles.sectionTitle} />

					<Box background='gray' className={styles.postTitle} />
					<Box
						background='gray'
						className={styles.postTitle}
						width='4/5'
						marginTop='1'
					/>
				</Flex>

				<Flex
					direction='column'
					gap='1'
					paddingY={{ laptop: '8' }}
					className={styles.sidebarSection}
				>
					<Box background='gray' className={styles.sectionTitle} />

					<Box background='gray' className={styles.postTitle} />
					<Box
						background='gray'
						className={styles.postTitle}
						width='4/5'
						marginTop='1'
					/>
				</Flex>

				<Box
					background='gray'
					className={styles.backButtonSkeleton}
					marginTop={{ laptop: '8' }}
				/>
			</Flex>
		</Box>
	);
};
