import { useDeleteCategory } from '@/fsd/shared/api/useDeleteCategory';
import type { CategoryWithCount } from '@jung/shared/types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { HiPencil, HiTrash } from 'react-icons/hi';
import * as styles from './CategoryCard.css';

interface CategoryCardProps {
	category: CategoryWithCount;
	level?: number;
	dragHandleProps?: DraggableProvidedDragHandleProps;
	subCategories: CategoryWithCount[];
	setEditingId: (id: string) => void;
	type: 'blog' | 'spots';
}

export const CategoryCard = ({
	category,
	level = 0,
	dragHandleProps,
	subCategories,
	setEditingId,
	type,
}: CategoryCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const deleteCategory = useDeleteCategory(type);
	const hasChildren = category.subCategoriesCount > 0;

	const handleDelete = () => {
		if (hasChildren) {
			alert(
				`Please delete all sub${type === 'blog' ? 'posts' : 'spots'} first`,
			);
			return;
		}

		if (
			window.confirm(`Are you sure you want to delete this ${type} category?`)
		) {
			deleteCategory.mutate(category.id);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={styles.categoryCard}
			style={assignInlineVars({
				[styles.levelIndent]: level ? `${level * 20}px` : null,
				[styles.borderColor]: category.color || null,
			})}
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
						category.subCategoriesCount > 0 && (
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
					<button
						className={styles.actionButton}
						onClick={handleDelete}
						disabled={deleteCategory.isPending}
					>
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
				<span className={styles.postCount}>
					{category.count} {type === 'blog' ? 'posts' : 'spots'}
				</span>
			</div>

			{isExpanded && (
				<AnimatePresence>
					{subCategories
						.filter((child) => child.parent_id === category.id)
						.map((childCategory) => (
							<CategoryCard
								key={childCategory.id}
								category={childCategory}
								level={level + 1}
								dragHandleProps={dragHandleProps}
								subCategories={subCategories.filter(
									(sub) => sub.parent_id === childCategory.id,
								)}
								setEditingId={setEditingId}
								type={type}
							/>
						))}
				</AnimatePresence>
			)}
		</motion.div>
	);
};
