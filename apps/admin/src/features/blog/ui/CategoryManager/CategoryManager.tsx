import { Flex } from '@jung/design-system/components';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
	DragDropContext,
	Draggable,
	type DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { CiCircleList, CiGrid41 } from 'react-icons/ci';
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi2';
import * as styles from './CategoryManager.css';

interface Category {
	id: string;
	name: string;
	description: string;
	postCount: number;
	color: string;
	parentId?: string | null;
	children?: Category[];
}

export const CategoryManager = () => {
	const [categories, setCategories] = useState<Category[]>([
		{
			id: '1',
			name: 'Development',
			description: 'Programming and development related posts',
			postCount: 15,
			color: '#0142C0',
		},
		{
			id: '2',
			name: 'Frontend',
			description:
				'Frontend development including React, Vue, and modern web technologies',
			postCount: 8,
			color: '#2563eb',
			parentId: '1',
		},
		{
			id: '3',
			name: 'Backend',
			description: 'Server-side development, APIs, and databases',
			postCount: 12,
			color: '#7c3aed',
			parentId: '1',
		},
		{
			id: '4',
			name: 'Design System',
			description:
				'Building and maintaining design systems, component libraries',
			postCount: 5,
			color: '#db2777',
		},
		{
			id: '5',
			name: 'DevOps',
			description:
				'CI/CD, deployment strategies, and infrastructure management',
			postCount: 7,
			color: '#059669',
		},
		{
			id: '6',
			name: 'Architecture',
			description: 'Software architecture patterns and best practices',
			postCount: 9,
			color: '#ea580c',
		},
		{
			id: '7',
			name: 'Testing',
			description: 'Unit testing, integration testing, and test automation',
			postCount: 6,
			color: '#8b5cf6',
		},
		{
			id: '8',
			name: 'Performance',
			description: 'Web performance optimization and monitoring',
			postCount: 4,
			color: '#0891b2',
		},
		{
			id: '9',
			name: 'Security',
			description: 'Web security best practices and vulnerability prevention',
			postCount: 3,
			color: '#dc2626',
		},
		{
			id: '10',
			name: 'Accessibility',
			description: 'Web accessibility guidelines and implementation',
			postCount: 5,
			color: '#0d9488',
		},
		{
			id: '11',
			name: 'Mobile Development',
			description:
				'Mobile app development with React Native and other frameworks',
			postCount: 6,
			color: '#6366f1',
		},
		{
			id: '12',
			name: 'Career',
			description: 'Career development and professional growth in tech',
			postCount: 4,
			color: '#f59e0b',
		},
	]);

	const [view, setView] = useState<'grid' | 'list'>('grid');

	const [editingId, setEditingId] = useState<string | null>(null);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(categories);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setCategories(items);
	};

	const handleCloseModal = () => {
		setEditingId(null);
	};

	const handleSave = () => {
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
			{categories.map((category, index) => (
				<Draggable key={category.id} draggableId={category.id} index={index}>
					{(provided) => (
						<motion.div
							ref={provided.innerRef}
							{...provided.draggableProps}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className={styles.categoryCard}
							style={{
								...provided.draggableProps.style,
								borderTopColor: category.color,
							}}
						>
							<div className={styles.cardHeader}>
								<div
									className={styles.dragHandle}
									{...provided.dragHandleProps}
								>
									⋮
								</div>
								<span className={styles.categoryName}>{category.name}</span>
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
							<div className={styles.cardContent}>
								{category.description && (
									<p className={styles.description}>{category.description}</p>
								)}
							</div>
							<div className={styles.cardFooter}>
								<span className={styles.postCount}>
									{category.postCount} posts
								</span>
							</div>
						</motion.div>
					)}
				</Draggable>
			))}
		</div>
	);

	return (
		<div className={styles.pageWrapper}>
			{/* Stats Overview */}
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<span className={styles.statValue}>{categories.length}</span>
					<span className={styles.statLabel}>Total Categories</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>
						{categories.reduce((sum, cat) => sum + cat.postCount, 0)}
					</span>
					<span className={styles.statLabel}>Total Posts</span>
				</div>
			</div>

			{/* Main Section */}
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
							<h3 className={styles.modalTitle}>EDIT CATEGORY</h3>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>NAME</label>
								<input
									type='text'
									className={styles.input}
									placeholder='Enter category name'
								/>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>DESCRIPTION</label>
								<textarea
									className={styles.textarea}
									placeholder='Enter category description'
								/>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>COLOR</label>
								<input type='color' className={styles.colorInput} />
							</div>
							<div className={styles.modalActions}>
								<button
									className={styles.cancelButton}
									onClick={handleCloseModal}
								>
									Cancel
								</button>
								<button className={styles.saveButton} onClick={handleSave}>
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
