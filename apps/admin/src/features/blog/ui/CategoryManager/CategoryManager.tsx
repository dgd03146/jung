import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
	DragDropContext,
	type DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { useGetCategories } from '../../api/useGetCategories';
import { CategoryForm } from './CategoryForm';
import { CategoryHeader } from './CategoryHeader';
import * as styles from './CategoryManager.css';
import { CategoryStats } from './CategoryStats';
import { CategoryGridView, CategoryListView } from './CategoryViews';

export const CategoryManager = () => {
	const { data } = useGetCategories();
	const { mainCategories, allCategories, subCategories } = data;

	const [view, setView] = useState<'grid' | 'list'>('grid');
	const [editingId, setEditingId] = useState<string | null>(null);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(allCategories);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
	};

	if (!data) return null;

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.mainSection}>
				<CategoryHeader
					view={view}
					onViewChange={setView}
					onAddNew={() => setEditingId('new')}
				/>
				<CategoryStats allCategories={allCategories} />

				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId='categories' direction='vertical'>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								<AnimatePresence>
									{view === 'grid' ? (
										<CategoryGridView
											mainCategories={mainCategories}
											subCategories={subCategories}
											onEdit={setEditingId}
										/>
									) : (
										<CategoryListView
											categories={allCategories}
											onEdit={setEditingId}
										/>
									)}
								</AnimatePresence>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>

			<AnimatePresence>
				{editingId && (
					<CategoryForm
						editingId={editingId}
						onClose={() => setEditingId(null)}
						mainCategories={mainCategories}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};
