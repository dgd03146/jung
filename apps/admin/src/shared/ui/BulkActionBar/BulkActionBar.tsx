import type { ReactNode } from 'react';
import * as styles from './BulkActionBar.css';

interface BulkActionBarProps {
	count: number;
	onClear: () => void;
	children: ReactNode;
}

export const BulkActionBar = ({
	count,
	onClear,
	children,
}: BulkActionBarProps) => {
	if (count === 0) return null;

	return (
		<div className={styles.container}>
			<span className={styles.count}>{count} selected</span>
			<div className={styles.divider} />
			{children}
			<div className={styles.divider} />
			<button type='button' className={styles.clearButton} onClick={onClear}>
				Clear
			</button>
		</div>
	);
};
