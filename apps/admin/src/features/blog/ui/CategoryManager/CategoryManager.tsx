import { Flex } from '@jung/design-system/components';
import type { CategoryWithCount } from '@jung/shared/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
	DragDropContext,
	Draggable,
	type DraggableProvidedDragHandleProps,
	type DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { CiCircleList, CiGrid41 } from 'react-icons/ci';
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi2';
import { useGetCategories } from '../../api/useGetCategories';
import * as styles from './CategoryManager.css';

interface CategoryFormData {
	name: string;
	description: string;
	color: string;
	parent_id: string | null;
}

interface CategoryCardProps {
	category: CategoryWithCount;
	level?: number;
	dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export const CategoryManager = () => {
	const { data } = useGetCategories();
	const { mainCategories, allCategories } = data;

	const [view, setView] = useState<'grid' | 'list'>('grid');
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState<CategoryFormData>({
		name: '',
		description: '',
		color: '#000000',
		parent_id: null,
	});

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(allCategories);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
	};

	const handleCloseModal = () => {
		setEditingId(null);
	};

	const handleSave = (data: CategoryFormData) => {
		// TODO: Implement save functionality
		// 1. Validate inputs
		// 2. If editing existing category, update it
		// 3. If creating new category, add it to the list
		// 4. Update categories state
		// 5. Close modal
		handleCloseModal();
	};

	const renderCategoryList = () => (
		<div className={styles.listView}>
			{allCategories.map((category, index) => (
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
									className={styles.dragHandle}
									{...provided.dragHandleProps}
								>
									⋮
								</div>
								<div
									className={styles.categoryBadge}
									style={{
										background: `${category.color}15`,
										color: category.color,
									}}
								>
									{category.name}
								</div>

								<div className={styles.listViewMeta}>
									<span>{category.postCount} posts</span>
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
							</div>
						</motion.div>
					)}
				</Draggable>
			))}
		</div>
	);

	const renderCategoryGrid = () => (
		<div className={styles.gridView}>
			{mainCategories.map((category, index) => (
				<Draggable key={category.id} draggableId={category.id} index={index}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.draggableProps}>
							<CategoryCard
								category={category}
								level={0}
								dragHandleProps={provided.dragHandleProps || null}
							/>
						</div>
					)}
				</Draggable>
			))}
		</div>
	);

	const CategoryCard = ({
		category,
		level = 0,
		dragHandleProps,
	}: CategoryCardProps) => {
		const [isExpanded, setIsExpanded] = useState(false);
		const subCategories = allCategories.filter(
			(cat) => cat.parent_id === category.id,
		);
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
							/>
						))}
					</AnimatePresence>
				)}
			</motion.div>
		);
	};

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<span className={styles.statValue}>{allCategories.length}</span>
					<span className={styles.statLabel}>Total Categories</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>
						{allCategories.reduce((sum, cat) => sum + (cat.postCount || 0), 0)}
					</span>
					<span className={styles.statLabel}>Total Posts</span>
				</div>
			</div>

			<div className={styles.mainSection}>
				<div className={styles.header}>
					<h2 className={styles.title}>Category Management</h2>
					<Flex gap='4' align='center'>
						<div className={styles.viewToggle}>
							<button
								className={styles.viewToggleButton}
								data-active={view === 'grid'}
								onClick={() => setView('grid')}
							>
								<CiGrid41 size={20} />
							</button>
							<button
								className={styles.viewToggleButton}
								data-active={view === 'list'}
								onClick={() => setView('list')}
							>
								<CiCircleList size={20} />
							</button>
						</div>
						<button
							className={styles.addButton}
							onClick={() => setEditingId('new')}
						>
							<HiPlus />
							New Category
						</button>
					</Flex>
				</div>

				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId='categories' direction='vertical'>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								<AnimatePresence>
									{view === 'grid'
										? renderCategoryGrid()
										: renderCategoryList()}
								</AnimatePresence>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>

			<AnimatePresence>
				{editingId && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={styles.modalOverlay}
						onClick={handleCloseModal}
					>
						<motion.div
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							className={styles.modalContent}
							onClick={(e) => e.stopPropagation()}
						>
							<h3 className={styles.modalTitle}>
								{editingId === 'new' ? 'NEW CATEGORY' : 'EDIT CATEGORY'}
							</h3>

							<div className={styles.formGroup}>
								<label className={styles.formLabel}>NAME</label>
								<input
									type='text'
									className={styles.input}
									value={formData.name}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											name: e.target.value,
										}))
									}
								/>
							</div>

							<div className={styles.formGroup}>
								<label className={styles.formLabel}>PARENT CATEGORY</label>
								<select
									className={styles.input}
									value={formData.parent_id || ''}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											parent_id: e.target.value || null,
										}))
									}
								>
									<option value=''>None (Top Level)</option>
									{mainCategories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</div>

							<div className={styles.formGroup}>
								<label className={styles.formLabel}>DESCRIPTION</label>
								<textarea
									className={styles.textarea}
									value={formData.description}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
								/>
							</div>

							<div className={styles.formGroup}>
								<label className={styles.formLabel}>COLOR</label>
								<input
									type='color'
									className={styles.colorInput}
									value={formData.color}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											color: e.target.value,
										}))
									}
								/>
							</div>

							<div className={styles.modalActions}>
								<button
									className={styles.cancelButton}
									onClick={handleCloseModal}
								>
									Cancel
								</button>
								<button
									className={styles.saveButton}
									onClick={() => handleSave(formData)}
									disabled={!formData.name}
								>
									Save Changes
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
