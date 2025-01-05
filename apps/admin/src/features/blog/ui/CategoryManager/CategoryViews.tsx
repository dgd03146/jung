import type { CategoryWithCount } from '@jung/shared/types';
import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { CategoryCard } from './CategoryCard';
import * as styles from './CategoryView.css';

interface CategoryViewProps {
	categories: CategoryWithCount[];
	onEdit: (id: string) => void;
}

export const CategoryListView = ({ categories, onEdit }: CategoryViewProps) => {
	return (
		<div className={styles.listView}>
			{categories.map((category, index) => (
				<Draggable key={category.id} draggableId={category.id} index={index}>
					{(provided) => (
						<motion.div
							ref={provided.innerRef}
							{...provided.draggableProps}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							className={styles.listViewItem}
						>
							<div className={styles.listViewContent}>
								<div
									className={styles.dragHandleStyle}
									{...provided.dragHandleProps}
								>
									⋮
								</div>
								<div
									className={styles.categoryBadgeStyle}
									style={{
										background: `${category.color}15`,
										color: category.color,
									}}
								>
									{category.name}
								</div>
								<div className={styles.listViewMeta}>
									<span>{category.postCount} posts</span>
									<div className={styles.actionsStyle}>
										<button
											className={styles.actionButtonStyle}
											onClick={() => onEdit(category.id)}
										>
											<HiPencil />
										</button>
										<button className={styles.actionButtonStyle}>
											<HiTrash />
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</Draggable>
			))}
		</div>
	);
};

interface CategoryGridViewProps {
	mainCategories: CategoryWithCount[];
	subCategories: CategoryWithCount[];
	onEdit: (id: string) => void;
}

export const CategoryGridView = ({
	mainCategories,
	subCategories,
	onEdit,
}: CategoryGridViewProps) => {
	return (
		<div className={styles.gridView}>
			{mainCategories.map((category, index) => (
				<Draggable key={category.id} draggableId={category.id} index={index}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.draggableProps}>
							<CategoryCard
								category={category}
								level={0}
								dragHandleProps={provided.dragHandleProps || undefined}
								subCategories={subCategories}
								setEditingId={onEdit}
							/>
						</div>
					)}
				</Draggable>
			))}
		</div>
	);
};
