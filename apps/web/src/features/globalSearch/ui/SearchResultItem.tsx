'use client';

import type { RefObject } from 'react';
import * as styles from './SearchResultItem.css';

type SearchResultType = 'blog' | 'place' | 'photo';

interface SearchResultItemProps {
	type: SearchResultType;
	title: string;
	subtitle: string;
	isSelected: boolean;
	onClick: () => void;
	itemRef?: RefObject<HTMLDivElement | null>;
}

const TYPE_CONFIG: Record<SearchResultType, { icon: string; badge: string }> = {
	blog: { icon: '📝', badge: 'Blog' },
	place: { icon: '📍', badge: 'Place' },
	photo: { icon: '📸', badge: 'Photo' },
};

export function SearchResultItem({
	type,
	title,
	subtitle,
	isSelected,
	onClick,
	itemRef,
}: SearchResultItemProps) {
	const config = TYPE_CONFIG[type];

	return (
		<div
			ref={itemRef}
			className={styles.item}
			data-selected={isSelected ? 'true' : undefined}
			onClick={onClick}
			role='option'
			tabIndex={-1}
			aria-selected={isSelected}
		>
			<div className={styles.icon}>{config.icon}</div>
			<div className={styles.content}>
				<div className={styles.title}>{title}</div>
				{subtitle && <div className={styles.description}>{subtitle}</div>}
			</div>
			<span className={styles.badge}>{config.badge}</span>
		</div>
	);
}
