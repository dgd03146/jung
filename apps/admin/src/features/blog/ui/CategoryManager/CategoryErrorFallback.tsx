import { MESSAGES } from '@/fsd/shared';
import * as styles from './CategoryErrorFallback.css';

export function CategoryErrorFallback(error: Error) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.errorMessage}>
					{MESSAGES.BLOG.CATEGORIES.ERROR}
				</div>
				<div className={styles.errorDetail}>{error.message}</div>
			</div>
		</div>
	);
}
