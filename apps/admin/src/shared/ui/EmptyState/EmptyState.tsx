import type { ReactNode } from 'react';
import * as styles from './EmptyState.css';

interface EmptyStateProps {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
}

export const EmptyState = ({
	icon,
	title,
	description,
	action,
}: EmptyStateProps) => {
	return (
		<div className={styles.container}>
			{icon && <div className={styles.icon}>{icon}</div>}
			<h3 className={styles.title}>{title}</h3>
			{description && <p className={styles.description}>{description}</p>}
			{action && action}
		</div>
	);
};
