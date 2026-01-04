import { Flex } from '@jung/design-system/components';
import { PostTable } from '@/fsd/features/blog/ui';

const BlogPage = () => {
	return (
		<Flex direction='column' gap='4'>
			{/* <Grid
        gridTemplateColumns={{ mobile: '1', tablet: '1/2', laptop: '1/4' }}
        gap="4"
      >
        <Stack background="white" borderRadius="lg" padding="4" gap="2">
          <span className={styles.statValue}>23</span>
          <span className={styles.statLabel}>Total Posts</span>
        </Stack>
        <Stack background="white" borderRadius="lg" padding="4" gap="2">
          <span className={styles.statValue}>15</span>
          <span className={styles.statLabel}>Published</span>
        </Stack>
        <Stack background="white" borderRadius="lg" padding="4" gap="2">
          <span className={styles.statValue}>8</span>
          <span className={styles.statLabel}>Drafts</span>
        </Stack>
        <Stack background="white" borderRadius="lg" padding="4" gap="2">
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Categories</span>
        </Stack>
      </Grid> */}

			<PostTable />
		</Flex>
	);
};

export default BlogPage;
