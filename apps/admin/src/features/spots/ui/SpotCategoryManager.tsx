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
import * as styles from './SpotCategoryManager.css';

interface SpotCategory {
	id: string;
	name: string;
	description: string;
	reviewCount: number;
	color: string;
	location: string;
	rating: number;
	imageUrl?: string;
	category?: string;
}

export const SpotCategoryManager = () => {
	const [categories, setCategories] = useState<SpotCategory[]>([
		{
			id: '1',
			name: 'Parks',
			description: 'Green spaces for relaxation in the city',
			reviewCount: 15,
			color: '#0142C0',
			location: 'Seoul',
			rating: 4.5,
			category: 'Outdoor',
		},
		{
			id: '2',
			name: 'Cafes',
			description: 'Cozy spaces for coffee and relaxation',
			reviewCount: 25,
			color: '#2563eb',
			location: 'Seoul',
			rating: 4.3,
			category: 'Food & Beverage',
		},
		{
			id: '3',
			name: 'Museums',
			description: 'Cultural spaces showcasing art and history',
			reviewCount: 18,
			color: '#7C3AED',
			location: 'Seoul',
			rating: 4.6,
			category: 'Culture',
		},
		{
			id: '4',
			name: 'Restaurants',
			description: 'Local and international dining experiences',
			reviewCount: 42,
			color: '#DB2777',
			location: 'Seoul',
			rating: 4.4,
			category: 'Food & Beverage',
		},
		{
			id: '5',
			name: 'Shopping Malls',
			description: 'Modern retail complexes and shopping centers',
			reviewCount: 30,
			color: '#059669',
			location: 'Seoul',
			rating: 4.2,
			category: 'Shopping',
		},
		{
			id: '6',
			name: 'Historic Sites',
			description: 'Traditional and historical landmarks',
			reviewCount: 22,
			color: '#B45309',
			location: 'Seoul',
			rating: 4.7,
			category: 'Culture',
		},
		{
			id: '7',
			name: 'Night Markets',
			description: 'Vibrant street markets with local food and goods',
			reviewCount: 35,
			color: '#4F46E5',
			location: 'Seoul',
			rating: 4.4,
			category: 'Shopping',
		},
		{
			id: '8',
			name: 'Temples',
			description: 'Traditional Buddhist temples and spiritual sites',
			reviewCount: 20,
			color: '#9D174D',
			location: 'Seoul',
			rating: 4.8,
			category: 'Culture',
		},
		{
			id: '9',
			name: 'Entertainment',
			description: 'Movie theaters, gaming centers, and entertainment venues',
			reviewCount: 28,
			color: '#6D28D9',
			location: 'Seoul',
			rating: 4.1,
			category: 'Entertainment',
		},
		{
			id: '10',
			name: 'Sports Facilities',
			description: 'Gyms, sports centers, and recreational facilities',
			reviewCount: 16,
			color: '#0284C7',
			location: 'Seoul',
			rating: 4.2,
			category: 'Sports',
		},
		{
			id: '11',
			name: 'Viewpoints',
			description: 'Scenic spots for city views and photography',
			reviewCount: 24,
			color: '#EA580C',
			location: 'Seoul',
			rating: 4.6,
			category: 'Outdoor',
		},
		{
			id: '12',
			name: 'Art Galleries',
			description: 'Contemporary and traditional art exhibitions',
			reviewCount: 19,
			color: '#0F766E',
			location: 'Seoul',
			rating: 4.5,
			category: 'Culture',
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
		handleCloseModal();
	};

	const renderSpotList = () => (
		<div className={styles.listView}>
			{categories.map((spot, index) => (
				<Draggable key={spot.id} draggableId={spot.id} index={index}>
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
										background: `${spot.color}15`,
										color: spot.color,
									}}
								>
									{spot.name}
								</div>
								<span className={styles.location}>{spot.location}</span>
								<div className={styles.listViewMeta}>
									<span>⭐ {spot.rating}</span>
									<span>{spot.reviewCount} 리뷰</span>
									<div className={styles.actions}>
										<button
											className={styles.actionButton}
											onClick={() => setEditingId(spot.id)}
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

	const renderSpotGrid = () => (
		<div className={styles.gridView}>
			{categories.map((spot, index) => (
				<Draggable key={spot.id} draggableId={spot.id} index={index}>
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
								borderTopColor: spot.color,
							}}
						>
							<div className={styles.cardHeader}>
								<div
									className={styles.dragHandle}
									{...provided.dragHandleProps}
								>
									⋮
								</div>
								<span className={styles.categoryName}>{spot.name}</span>
								<div className={styles.actions}>
									<button
										className={styles.actionButton}
										onClick={() => setEditingId(spot.id)}
									>
										<HiPencil />
									</button>
									<button className={styles.actionButton}>
										<HiTrash />
									</button>
								</div>
							</div>
							<div className={styles.cardContent}>
								{spot.description && (
									<p className={styles.description}>{spot.description}</p>
								)}
								<div className={styles.spotInfo}>
									<span className={styles.location}>{spot.location}</span>
									<span className={styles.rating}>⭐ {spot.rating}</span>
								</div>
							</div>
							<div className={styles.cardFooter}>
								<span className={styles.reviewCount}>
									{spot.reviewCount} 리뷰
								</span>
								{spot.category && (
									<span className={styles.category}>{spot.category}</span>
								)}
							</div>
						</motion.div>
					)}
				</Draggable>
			))}
		</div>
	);

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<span className={styles.statValue}>{categories.length}</span>
					<span className={styles.statLabel}>Total Categories</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>
						{categories.reduce((sum, cat) => sum + cat.reviewCount, 0)}
					</span>
					<span className={styles.statLabel}>Total Reviews</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>
						{(
							categories.reduce((sum, cat) => sum + cat.rating, 0) /
							categories.length
						).toFixed(1)}
					</span>
					<span className={styles.statLabel}>Average Rating</span>
				</div>
			</div>

			<div className={styles.mainSection}>
				<div className={styles.header}>
					<h2 className={styles.title}>Spot Category Management</h2>
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
							Add New Category
						</button>
					</Flex>
				</div>

				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId='spots' direction='vertical'>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								<AnimatePresence>
									{view === 'grid' ? renderSpotGrid() : renderSpotList()}
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
								{editingId === 'new' ? 'Add New Category' : 'Edit Category'}
							</h3>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Name</label>
								<input
									type='text'
									className={styles.input}
									placeholder='Enter category name'
								/>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Description</label>
								<textarea
									className={styles.textarea}
									placeholder='Enter category description'
								/>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Location</label>
								<input
									type='text'
									className={styles.input}
									placeholder='Enter location'
								/>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Category Type</label>
								<input
									type='text'
									className={styles.input}
									placeholder='Enter category type'
								/>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Color</label>
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
									Save
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
