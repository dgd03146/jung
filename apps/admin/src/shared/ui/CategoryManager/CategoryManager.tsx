import { useGetCategories } from '@/fsd/shared/api/useGetCategories';
import { Box, Stack } from '@jung/design-system/components';
import type { CategoryWithCount } from '@jung/shared/types';
import { useRouter } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
	DragDropContext,
	type DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { CategoryForm } from './CategoryForm';
import { CategoryHeader } from './CategoryHeader';
import { CategoryStats } from './CategoryStats';
import { CategoryGridView, CategoryListView } from './CategoryViews';

interface CategoryManagerProps {
	onUpdateOrder?: (items: CategoryWithCount[]) => void;
}

export const CategoryManager = ({ onUpdateOrder }: CategoryManagerProps) => {
	const [view, setView] = useState<'grid' | 'list'>('grid');
	const [editingId, setEditingId] = useState<string | null>(null);

	const router = useRouter();
	const pathname = router.state.location.pathname;
	const type = pathname.split('/')[1] as 'blog' | 'spots';

	const { data } = useGetCategories(type);

	const editingCategory =
		editingId && editingId !== 'new'
			? data.allCategories.find((category) => category.id === editingId)
			: undefined;

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(data.allCategories);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		onUpdateOrder?.(items);
	};

	return (
		<Stack gap='6'>
			<Box background='white' borderRadius='xl'>
				<CategoryHeader
					view={view}
					onViewChange={setView}
					onAddNew={() => setEditingId('new')}
					type={type}
				/>
				<CategoryStats allCategories={data.allCategories} type={type} />

				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId='categories' direction='vertical'>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								<AnimatePresence>
									{view === 'grid' ? (
										<CategoryGridView
											mainCategories={data.mainCategories}
											subCategories={data.subCategories}
											onEdit={setEditingId}
											type={type}
										/>
									) : (
										<CategoryListView
											categories={data.allCategories}
											onEdit={setEditingId}
											type={type}
										/>
									)}
								</AnimatePresence>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Box>

			<AnimatePresence>
				{editingId && (
					<CategoryForm
						editingId={editingId}
						onClose={() => setEditingId(null)}
						mainCategories={data.mainCategories}
						editingCategory={editingCategory}
						type={type}
					/>
				)}
			</AnimatePresence>
		</Stack>
	);
};
