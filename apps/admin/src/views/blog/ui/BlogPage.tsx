import { PostTable } from '@/fsd/features/blog/ui';
import * as styles from './BlogPage.css';

const BlogPage = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<span className={styles.statValue}>23</span>
					<span className={styles.statLabel}>Total Posts</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>15</span>
					<span className={styles.statLabel}>Published</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>8</span>
					<span className={styles.statLabel}>Drafts</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>12</span>
					<span className={styles.statLabel}>Categories</span>
				</div>
			</div>

			<PostTable />
		</div>
	);
};

export default BlogPage;
