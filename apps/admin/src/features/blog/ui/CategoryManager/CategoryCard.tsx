import type { CategoryWithCount } from '@jung/shared/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { HiPencil, HiTrash } from 'react-icons/hi';
import * as styles from './CategoryCard.css.ts';

interface CategoryCardProps {
	category: CategoryWithCount;
	level?: number;
	dragHandleProps?: DraggableProvidedDragHandleProps;
	subCategories: CategoryWithCount[];
	setEditingId: (id: string) => void;
}

export const CategoryCard = ({
	category,
	level = 0,
	dragHandleProps,
	subCategories,
	setEditingId,
}: CategoryCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const hasChildren = subCategories.length > 0;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={styles.categoryCard}
			style={{
				marginLeft: `${level * 20}px`,
				borderTopColor: !category.parent_id ? '#0142C0' : category.color,
			}}
		>
			<div className={styles.cardHeader}>
				<div className={styles.dragHandle} {...dragHandleProps}>
					⋮
				</div>
				{hasChildren && (
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className={styles.expandButton}
					>
						{isExpanded ? '▼' : '▶'}
					</button>
				)}
				<span className={styles.categoryName}>
					{category.name}
					{category.parent_id ? (
						<span className={styles.parentBadge}>Sub</span>
					) : (
						subCategories.length > 0 && (
							<span className={styles.parentBadge}>
								{subCategories.length} sub
							</span>
						)
					)}
				</span>
				<div className={styles.actions}>
					<button
						className={styles.actionButton}
						onClick={() => setEditingId(category.id)}
					>
						<HiPencil />
					</button>
					<button className={styles.actionButton}>
						<HiTrash />
					</button>
				</div>
			</div>

			{category.description && (
				<div className={styles.cardContent}>
					<p className={styles.description}>{category.description}</p>
				</div>
			)}

			<div className={styles.cardFooter}>
				<span className={styles.postCount}>{category.postCount} posts</span>
			</div>

			{isExpanded && (
				<AnimatePresence>
					{subCategories.map((childCategory) => (
						<CategoryCard
							key={childCategory.id}
							category={childCategory}
							level={level + 1}
							dragHandleProps={dragHandleProps}
							subCategories={[]}
							setEditingId={() => {}}
						/>
					))}
				</AnimatePresence>
			)}
		</motion.div>
	);
};
